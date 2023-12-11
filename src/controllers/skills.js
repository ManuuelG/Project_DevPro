const { User } = require('../models/user')
const { Skill } = require('../models/skill')
const mongoose = require('mongoose')

const getAll = async (req, res) => {
  try {
    const skills = await Skill.find()
    res.json(skills)
  } catch (error) {
    return res.status(404).json({ message: 'No hay skills' })
  }
}

const getById = async (req, res) => {
  const { skillId } = req.params

  const skill = await Skill.findById(skillId)
  if (!skill) {
    return res.status(404).json({ message: 'No se encuentra la skill' })
  }

  res.json(skill)
}

const create = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user.id

    const newSkillData = {
      ...req.body,
      user: new mongoose.Types.ObjectId(userId),
    }

    const newSkill = await Skill.create(newSkillData)

    await User.findByIdAndUpdate(userId, { $push: { skills: newSkill._id } })

    res.json(newSkill)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear la skill' })
  }
}

const update = async (req, res) => {
  try {
    const { skillId } = req.params
    const userId = req.user.id

    const existingSkill = await Skill.findOne({
      _id: skillId,
      user: userId,
    })

    if (!existingSkill) {
      return res.status(404).json({ error: 'Skill no encontrada' })
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      skillId,
      { ...req.body },
      { new: true }
    )

    res.json(updatedSkill)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar la skill' })
  }
}

const remove = async (req, res) => {
  const { skillId } = req.params
  const deletedSkill = await Skill.findByIdAndDelete(skillId)
  if (!deletedSkill) {
    return res.status(404).json({ message: 'Skill no encontrado' })
  }

  res.json(deletedSkill)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
