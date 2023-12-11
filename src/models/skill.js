const mongoose = require('mongoose')
const { body } = require('express-validator')

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, requited: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const Skill = mongoose.model('Skill', skillSchema)

const skillValidationSchema = body('name').notEmpty()
body('fecha').notEmpty()
body('image').notEmpty()

exports.skillValidationSchema = skillValidationSchema

exports.Skill = Skill
