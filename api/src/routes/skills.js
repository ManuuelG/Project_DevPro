const { Router } = require('express')
const skillController = require('../controllers/skills')
const { skillValidationSchema } = require('../models/skill')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const router = Router()

router.get('/', skillController.getAll)
router.get(
  '/:skillId',
  auth,
  validateParamId('skillId'),
  validate,
  skillController.getById
)

router.post('/', auth, skillValidationSchema, validate, skillController.create)

router.put(
  '/:skillId',
  auth,
  admin,
  validateParamId('skillId'),
  skillValidationSchema,
  validate,
  skillController.update
)

router.delete(
  '/:skillId',
  auth,
  admin,
  validateParamId('skillId'),
  validate,
  skillController.remove
)

module.exports = router
