const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  };

  if (err.errors?.length) {
    response.errors = err.errors;
  }

  res.status(statusCode).json(response);
};

export default errorMiddleware;