import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/users.js";
import bcrypt from "bcrypt";

export const signupService = async (data) => {
  const { name, email, password, phone, role } = data;
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!existingUser) {
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

export const loginService = async (data) => {
  try {
    console.log(data);
    return "login successfull";
  } catch (error) {
    console.error(error);
  }
};

export const userData = async (token) => {
  return "user data";
};
