import * as authService from "./auth.service.js";
import { loginValidation, signupValidation } from "./auth.validation.js";

export const signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const userData = await signupValidation.parse(req.body);
    const user = await authService.signupService(userData);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const loginCredentials = await loginValidation.parse(req.body);
    const user = await authService.loginService(loginCredentials);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    return res.json("Hello Dear");
  } catch (error) {
    next(error);
  }
};
