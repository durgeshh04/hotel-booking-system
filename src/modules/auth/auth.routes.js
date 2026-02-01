import { Router } from "express";
import { login, me, signup } from "./auth.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", requireAuth, me);

export default router;
