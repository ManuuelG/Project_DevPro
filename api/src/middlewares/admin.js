module.exports = function (req, res, next) {
  const { isAdmin } = req.user

  if (!isAdmin) return res.status(403).json({ message: 'Estas jodio' })

  next()
}
