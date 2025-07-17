const { AppError } = require('../utils/errors');

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥', err.stack);
  }

  // Send response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Only in dev
  });
};