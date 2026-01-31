import { email, z } from "zod";

export const signupValidation = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().max(10),
});

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
