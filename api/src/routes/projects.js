const { Router } = require('express')
const projectController = require('../controllers/projects')
const { projectValidationSchema } = require('../models/project')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const router = Router()

router.get('/', projectController.getAll)

router.get('/favorites', auth, projectController.getFavorites)

router.get(
  '/:projectId',
  auth,
  validateParamId('projectId'),
  validate,
  projectController.getById
)

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

router.put(
  '/favorites/:projectId',
  auth,
  validateParamId('projectId'),
  validate,
  projectController.addFavorite
)

router.delete(
  '/:projectId',
  auth,
  validateParamId('projectId'),
  validate,
  projectController.remove
)

module.exports = router