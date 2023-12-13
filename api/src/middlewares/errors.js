module.exports = function (err, req, res, next) {
  console.log('[500]', err)

  res
    .status(500)
    .json({ message: 'Estamos trabajando para volver lo antes posible.' })
}
