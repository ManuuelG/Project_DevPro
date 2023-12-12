const mongoose = require('mongoose')
const { body } = require('express-validator')

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const Skill = mongoose.model('Skill', skillSchema)

const skillValidationSchema = [
  body('name')
    .notEmpty()
    .withMessage('El nombre de la habilidad es obligatorio')
    .custom(async (name, { req }) => {
      const filter = { name }

      if (req.params.skillId) {
        filter['_id'] = { $ne: req.params.skillId }
      }

      const skill = await Skill.findOne(filter)
      if (skill) throw new Error('Ya hay una habilidad con ese nombre')
    }),
]

exports.skillValidationSchema = skillValidationSchema

exports.Skill = Skill
