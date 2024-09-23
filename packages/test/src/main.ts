import { db } from '@repo/drizzle';
import * as schema from '@repo/drizzle/schema';
import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import { expect, test } from 'vitest';

export { seedDatabase } from './seedDatabase';

type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export const integrationTest = test.extend<{ db: Transaction }>({
  db: async ({}, use) => {
    db.transaction(async (tx) => {
      await use(tx);

      expect(() => tx.rollback()).toThrow();
    });
  },
});
