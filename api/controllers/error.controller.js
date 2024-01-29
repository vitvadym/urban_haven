const globalErrorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal server error';

  return res.status(status).json({
    status,
    message,
    success: false,
  });
};

export default globalErrorHandler;
