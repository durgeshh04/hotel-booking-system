import { Router } from "express";
import { login, me, signup } from "./auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", me);

export default router;
