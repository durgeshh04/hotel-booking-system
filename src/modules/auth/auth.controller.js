import { success } from "zod";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as authService from "./auth.service.js";
import { loginValidation, signupValidation } from "./auth.validation.js";

export const signup = asyncHandler(async (req, res) => {
  const userData = signupValidation.parse(req.body);
  const user = await authService.signupService(userData);
  res.status(201).json({
    success: true,
    data: user,
    error: null,
  });
});

export const login = async (req, res, next) => {
  try {
    const loginCredentials = await loginValidation.parse(req.body);
    const user = await authService.loginService(loginCredentials);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const me = asyncHandler(async (req, res) => {
  const user = await authService.userData(req.id);
  res.status(200).json({ success: true, data: user, error: null });
});
