require('dotenv').config();

const sendErrorDev = (err, res) => {
  console.error(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErroProd = (err, res) => {
  console.error(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    console.log('firing');
    sendErrorDev(err, res);
  } else {
    sendErroProd(err, res);
  }
};
