import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      data: null,
      error: "Unauthorized",
    });
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  req.user = decoded;
  next();
};
