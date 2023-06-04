
function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message : err.errors[0].message
    })
  } else if (err.name === 'AggregateError') { // SequelizeBulkCreate Validation
    res.status(400).json({
      message : err.errors[0].message.split(':')[1].trim()
    })
  } else if (err.name === 'EmptyLoginInput') {
    res.status(400).json({
      message : 'Email and password is required'
    })
  } else if (err.name === 'InvalidLoginInput') {
    res.status(401).json({
      message : 'Wrong Email / Password'
    })
  } else if (err.name === 'JsonWebTokenError' || err.name === 'InvalidToken') {
    res.status(401).json({
      message : 'Your token is invalid'
    })
  } else if (err.name === 'Forbidden') {
    res.status(403).json(403).json({
      message : 'You are forbidden from doing this action'
    })
  } else if (err.name === 'NotFound') {
    res.status(404).json({
      message : 'Data not found'
    })
  } else {
    console.log(err);
    res.status(500).json({
      message : 'Internal server error, please try later'
    })
  }
}

module.exports = errorHandler;