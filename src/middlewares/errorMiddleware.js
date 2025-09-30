const errorMiddleware = async (err, req, res, next) => {
  const code = err.code || 500;
  const message = err.message || "Internal Server Error";

  res.status(code).json({
    success: "false",
    code,
    message,
  });
};

export default errorMiddleware;
