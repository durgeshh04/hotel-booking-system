import { serial, varchar, integer, json, decimal } from "drizzle-orm/pg-core";
import { pgTable, foreignKey } from "drizzle-orm/pg-core";
import { users } from "./users";

export const hotels = pgTable(
  "hotels",
  {
    id: serial("id").primaryKey(),
    owner_id: integer("owner_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description").notNull(),
    city: varchar("city").notNull(),
    country: varchar("country").notNull(),
    amenities: json("amenities"),
    rating: decimal(2, 1).default(0.0),
    total_reviews: integer("total_reviews").default(0),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    ownerFk: foreignKey({
      columns: [table.owner_id],
      foreignColumns: [users.id],
    }),
  }),
);
