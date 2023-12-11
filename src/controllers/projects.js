const { Project } = require('../models/project')
const { User } = require('../models/user')
const { Skill } = require('../models/skill')

const mongoose = require('mongoose')

const getAll = async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (error) {
    return res.status(404).json({ message: 'No hay proyectos' })
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

const getBySkill = async (req, res) => {
  const { skill } = req.query

  try {
    const projects = await Project.find({ skill })
    res.json(projects)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al filtrar los proyectos por skill' })
  }
}

const getByUser = async (req, res) => {
  const { userId } = req.query

  try {
    const projects = await Project.find({ user: userId })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar proyectos por usuario' })
  }
}

const create = async (req, res) => {
  try {
    const userId = req.user.id

    const existingProject = await Project.findOne({
      $or: [
        { name: req.body.name },
        { githublink: req.body.githublink },
        { deploylink: req.body.deploylink },
      ],
    })

    if (existingProject) {
      return res
        .status(400)
        .json({ error: 'Ya existe un proyecto con esos datos' })
    }

    const newProject = await Project.create({
      ...req.body,
      user: new mongoose.Types.ObjectId(userId),
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
    res.status(500).json({ error: 'Error al crear el proyecto' })
  }
}

const update = async (req, res) => {
  try {
    const { projectId } = req.params
    const userId = req.user.id

    const existingProject = await Project.findOne({
      _id: projectId,
      user: userId,
    })

    if (!existingProject) {
      return res.status(404).json({ error: 'Proyecto no encontrado' })
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { ...req.body },
      { new: true }
    )

    res.json(updatedProject)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el proyecto' })
  }
}

const remove = async (req, res) => {
  const { projectId } = req.params
  const deletedProject = await Project.findByIdAndDelete(projectId)
  if (!deletedProject) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }

  res.json(deletedProject)
}

module.exports = {
  getAll,
  getById,
  getBySkill,
  getByUser,
  create,
  update,
  remove,
}
