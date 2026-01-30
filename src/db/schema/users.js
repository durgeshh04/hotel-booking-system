import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// role enum:
export const roleEnum = pgEnum("user_role", ["customer", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").default("customer").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_now: timestamp("updated_now")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
