import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/users.js";
import bcrypt from "bcrypt";
import { signToken, verifyToken } from "../../utils/jwt.js";
import { AppError } from "../../utils/AppError.js";

export const signupService = async (data) => {
  const { name, email, password, phone, role } = data;
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      phone: users.phone,
    });

  return user;
};

export const loginService = async ({ email, password }) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};

export const userData = async (userId) => {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      phone: users.phone,
    })
    .from(users)
    .where(eq(users.id, userId));

  return user;
};
