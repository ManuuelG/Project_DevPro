const mongoose = require('mongoose')
const { body } = require('express-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
})

const User = mongoose.model('User', userSchema)

const userValidationSchema = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario no puede estar vacío'),
  body('password').notEmpty().withMessage('La password no puede estar vacía'),
]

exports.User = User
exports.userValidationSchema = userValidationSchema
