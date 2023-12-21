const mongoose = require('mongoose')
const { body } = require('express-validator')

const createUploader = require('../utils/multer')

const Project = mongoose.model('Project', {
  name: { type: String, required: true, unique: true },
  date: { type: Number, required: true },
  image: { type: String },
  imageCloudinaryId: { type: String, required: true },
  repolink: { type: String, required: true, unique: true },
  deploylink: { type: String, unique: true },
  description: { type: String },
  faved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
  ],
})

const projectValidationSchema = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .custom(async (name, { req }) => {
      const filter = { name }
      if (req.params.projectId) {
        filter['_id'] = { $ne: req.params.projectId }
      }
      const project = await Project.findOne(filter)
      if (project) throw new Error('Ya hay un proyecto con ese nombre')
    }),
  body('date').notEmpty().isNumeric(),
  body('repolink')
    .notEmpty()
    .withMessage('El enlace del repositorio es obligatorio')
    .custom(async (repolink, { req }) => {
      const filter = { repolink }
      if (req.params.projectId) {
        filter['_id'] = { $ne: req.params.projectId }
      }
      const project = await Project.findOne(filter)
      if (project)
        throw new Error('Ya hay un proyecto con ese enlace de repositorio')
    }),
  body('deploylink')
    .optional({ checkFalsy: true })
    .custom(async (deploylink, { req }) => {
      if (deploylink) {
        const filter = { deploylink }
        if (req.params.projectId) {
          filter['_id'] = { $ne: req.params.projectId }
        }
        const project = await Project.findOne(filter)
        if (project)
          throw new Error('Ya hay un proyecto con ese enlace de despliegue')
      }
    }),
  body('skills').notEmpty(),
]

const TYPES = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
}

exports.projectValidationSchema = projectValidationSchema
exports.Project = Project
exports.uploadImage = createUploader(TYPES).single('image')
