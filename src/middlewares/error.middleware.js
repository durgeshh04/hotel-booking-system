import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // Postgres unique constraint
  if (err.code === "23505") {
    statusCode = 409;
    message = "Resource already exists";
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

  // Server-side log
  console.error("ERROR 💥", {
    message: err.message,
    stack: err.stack,
    code: err.code,
  });

  res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
  });
};
