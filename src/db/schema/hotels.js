import { serial, varchar, integer } from "drizzle-orm/pg-core";
import { pgTable, foreignKey } from "drizzle-orm/pg-core";
import { users } from "./users";

export const hotels = pgTable(
  "hotels",
  {
    id: serial("id").primaryKey(),
    owner_id: integer("owner_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => ({
    ownerFk: foreignKey({
      columns: [table.owner_id],
      foreignColumns: [users.id],
    }),
  }),
);
