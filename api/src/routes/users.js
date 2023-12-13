const { Router } = require('express')

const userController = require('../controllers/users')

const validateParamId = require('../middlewares/mongoIdFromParam')

const { userValidationSchema } = require('../models/user')
const validate = require('../middlewares/validate')

const router = Router()

router.post('/signup', userValidationSchema, validate, userController.register)
router.post('/signin', userValidationSchema, validate, userController.login)
router.get('/', userController.getAll)
router.get(
  '/:userId',
  validateParamId('userId'),
  validate,
  userController.getById
)

module.exports = router
