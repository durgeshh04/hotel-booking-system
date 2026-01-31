export const errorHandler = (err, req, res, next) => {
  // fallback defaults
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Drizzle / Postgres errors (Neon)
  if (err.code === "23505") {
    statusCode = 409;
    message = "Duplicate resource";
  }

  if (err.code === "22P02") {
    statusCode = 400;
    message = "Invalid input format";
  }

  // Zod validation errors
  if (err.name === "ZodError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Log full error (only server-side)
  console.error({
    message: err.message,
    stack: err.stack,
    code: err.code,
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
};
