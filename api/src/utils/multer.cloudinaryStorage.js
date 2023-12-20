const path = require('path')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'projects',
    format: async (req, file) => path.extname(file.originalname).substring(1),
    public_id: (req, file) =>
      Date.now() + '-' + Math.round(Math.random() * 1e9),
  },
})
module.exports = storage
