const { Router } = require('express')
const projectController = require('../controllers/projects')
const { projectValidationSchema, uploadImage } = require('../models/project')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')

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
  uploadImage,
  projectValidationSchema,
  validate,
  projectController.create
)

router.put(
  '/favorites/:projectId',
  auth,
  validateParamId('projectId'),
  validate,
  projectController.addFavorite
)

router.put(
  '/:projectId',
  auth,
  uploadImage,
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
