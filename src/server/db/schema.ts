// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTableCreator, timestamp, varchar, jsonb } from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `postpulse_${name}`)

export const posts = createTable('post', {
    id: varchar('id', { length: 256 }).primaryKey(),
    user_id: varchar('user_id', { length: 256 }).notNull(),
    result: jsonb('result').notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow()
})
