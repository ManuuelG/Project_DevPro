const mongoose = require('mongoose')
const { body } = require('express-validator')

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  fecha: { type: Number },
  image: { type: String, required: true },
  githublink: { type: String, required: true },
  deploylink: { type: String },
  description: { type: String },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
  ],
})

const Project = mongoose.model('Project', projectSchema)

const projectValidationSchema = body('name').notEmpty()
body('fecha').notEmpty()
body('image').notEmpty()
body('githublink').notEmpty()
body('deploylink').notEmpty()
body('skills').notEmpty()

exports.projectValidationSchema = projectValidationSchema

exports.Project = Project
