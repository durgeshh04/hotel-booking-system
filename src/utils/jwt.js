import jwt from "jsonwebtoken";
import "dotenv/config";

export const signToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = async (token) => {
  return this.verify(token, process.env.JWT_SECRET);
};
