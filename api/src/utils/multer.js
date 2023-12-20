const multer = require('multer')

const storage = require('./multer.cloudinaryStorage')

module.exports = TYPES =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (TYPES[file.mimetype]) return cb(null, true)

      cb(new Error('invalid image'))
    },
  })
