const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const register = async (req, res) => {
  const { password: plainTextPassword, username } = req.body

  const user = await User.findOne({ username })

  if (user) {
    return res.status(400).json({
      message: 'Ya existe un usuario',
    })
  }

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(plainTextPassword, salt)

  const newUser = await User.create({ username, password })

  const token = jwt.sign({ id: newUser._id }, process.env.privateKey)

  res.setHeader('Access-Control-Expose-Headers', 'x-auth-token')
  res.setHeader('x-auth-token', token)

  res.json({ message: 'Usuario registrado con éxito' })
}

const login = async (req, res) => {
  const { password: plainTextPassword, username } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res
      .status(400)
      .json({ message: 'El usuario y contraseña no coincide' })
  }

  const isValidUser = await bcrypt.compare(plainTextPassword, user.password)

  if (!isValidUser) {
    return res
      .status(400)
      .json({ message: 'El usuario y contraseña no coincide' })
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.privateKey
  )

  res.setHeader('Access-Control-Expose-Headers', 'x-auth-token')
  res.setHeader('x-auth-token', token)

  res.json({ message: 'Usuario logueado' })
}

const getAll = async (req, res) => {
  try {
    const users = await User.find()
      .select('username projects skills _id')
      .lean()
    res.json(users)
  } catch (error) {
    return res.status(404).json({ message: 'No hay usuarios' })
  }
}

const getById = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
      .select('username projects skills _id')
      .lean()
    if (!user) {
      return res.status(404).json({ message: 'No se encuentra el usuario' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario por ID' })
  }
}

module.exports = { register, login, getAll, getById }
