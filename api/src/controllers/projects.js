const { Project } = require('../models/project')
const { User } = require('../models/user')
const { Skill } = require('../models/skill')
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary')

const getAll = async (req, res) => {
  try {
    const { skills, author } = req.query
    let query = {}

    if (skills) {
      const skillNames = await Skill.find({ name: { $in: skills.split(',') } })
      const skillIds = skillNames.map(skill => skill._id)
      query.skills = { $in: skillIds }
    }

    if (author) {
      const authorName = await User.findOne({ username: author })

      if (authorName) {
        query.author = authorName._id
      } else {
        return res.status(404).json({
          message: 'Autor no encontrado',
        })
      }
    }

    const projects = await Project.find(query)
      .populate({
        path: 'author',
        select: 'username',
      })
      .populate({
        path: 'skills',
        select: 'name',
      })
    if (projects.length === 0) {
      return res.status(404).json({
        message:
          'No hay proyectos que coincidan con los filtros proporcionados',
      })
    }

    res.json(projects)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const getById = async (req, res) => {
  const { projectId } = req.params

  const project = await Project.findById(projectId)
  if (!project) {
    return res.status(404).json({ message: 'No se encuentra el proyecto' })
  }

  res.json(project)
}

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id
    console.log(userId)
    const user = await User.findById(userId).populate('favorites')

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const favorites = user.favorites

    res.status(200).json({ favorites })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

const create = async (req, res) => {
  try {
    const userId = req.user.id

    const { path: image, filename: imageCloudinaryId } = req.file

    const newProject = await Project.create({
      ...req.body,
      image,
      imageCloudinaryId,
      author: new mongoose.Types.ObjectId(userId),
    })

    const { skills } = req.body

    await Skill.updateMany(
      { _id: { $in: skills } },
      { $push: { projects: newProject._id } }
    )

    await User.findByIdAndUpdate(userId, {
      $push: { projects: newProject._id },
    })

    res.json(newProject)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error al crear el proyecto', details: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { projectId } = req.params
    const userId = req.user.id

    if (!req.file) {
      const existingProject = await Project.findOne({
        _id: projectId,
        author: userId,
      })

      if (!existingProject) {
        return res.status(404).json({
          error: 'Proyecto no encontrado o no tiene permisos para modificarlo.',
        })
      }

      const updatedProject = await Project.findByIdAndUpdate(projectId, {
        ...req.body,
      })

      res.json(updatedProject)
      return
    }

    const { path: image, filename: imageCloudinaryId } = req.file

    const existingProject = await Project.findOne({
      _id: projectId,
      author: userId,
    })

    if (!existingProject) {
      return res.status(404).json({
        error: 'Proyecto no encontrado o no tiene permisos para modificarlo.',
      })
    }

    const currentSkills = existingProject.skills

    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      ...req.body,
      image,
      imageCloudinaryId,
    })

    await cloudinary.uploader.destroy(updatedProject.imageCloudinaryId, {
      invalidate: true,
    })

    const updatedSkills = updatedProject.skills

    const addedSkills = updatedSkills.filter(
      skill => !currentSkills.includes(skill)
    )
    const deletedSkills = currentSkills.filter(
      skill => !updatedSkills.includes(skill)
    )

    await Skill.updateMany(
      { _id: { $in: addedSkills } },
      { $push: { projects: updatedProject._id } }
    )

    await Skill.updateMany(
      { _id: { $in: deletedSkills } },
      { $pull: { projects: updatedProject._id } }
    )

    res.json(updatedProject)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el proyecto' })
  }
}

const addFavorite = async (req, res) => {
  try {
    const { projectId } = req.params
    const userId = req.user.id

    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' })
    }

    const isFavorited = project.faved.includes(userId)

    if (isFavorited) {
      await Project.findByIdAndUpdate(projectId, {
        $pull: { faved: userId },
      })
    } else {
      await Project.findByIdAndUpdate(projectId, {
        $push: { faved: userId },
      })
    }

    const updateUser = isFavorited
      ? await User.findByIdAndUpdate(
          userId,
          {
            $pull: { favorites: projectId },
          },
          { new: true }
        ).populate('favorites')
      : await User.findByIdAndUpdate(
          userId,
          {
            $push: { favorites: projectId },
          },
          { new: true }
        ).populate('favorites')

    const updatedProject = await Project.findById(projectId)

    res.json({ project: updatedProject, user: updateUser })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const remove = async (req, res) => {
  try {
    const { projectId } = req.params
    const userId = req.user.id

    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      author: userId,
    })

    await cloudinary.uploader.destroy(deletedProject.imageCloudinaryId, {
      invalidate: true,
    })

    if (!deletedProject) {
      return res.status(404).json({
        msg: 'Proyecto no encontrado o no tiene permisos para eliminarlo.',
      })
    }

    res.json(deletedProject)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar el proyecto' })
  }
}

module.exports = {
  getAll,
  getById,
  getFavorites,
  create,
  update,
  addFavorite,
  remove,
}
