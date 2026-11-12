import {
  boolean,
  customType,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const citext = customType<{ data: string }>({
  dataType() {
    return "citext";
  },
});

export const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  username: text().unique().notNull(),
  display_name: text().notNull(),
  email: citext().notNull().unique(),
  password: text().notNull(),
  is_active: boolean().notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
