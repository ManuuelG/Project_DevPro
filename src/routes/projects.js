const { Router } = require('express')
const projectController = require('../controllers/projects')
const { projectValidationSchema } = require('../models/project')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const router = Router()

router.get('/', projectController.getAll)
router.get(
  '/:projectId',
  auth,
  validateParamId('projectId'),
  validate,
  projectController.getById
)
router.get('/category', auth, projectController.getBySkill)
router.get('/user', auth, projectController.getByUser)

router.post(
  '/',
  auth,
  projectValidationSchema,
  validate,
  projectController.create
)

router.put(
  '/:projectId',
  auth,
  validateParamId('projectId'),
  projectValidationSchema,
  validate,
  projectController.update
)

router.delete(
  '/:projectId',
  auth,
  validateParamId('projectId'),
  validate,
  projectController.remove
)

module.exports = router
