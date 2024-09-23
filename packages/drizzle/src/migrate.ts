import { join } from 'path';
import { env } from '@repo/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import * as schema from './schema';

const migrationPool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  max: 1,
});

export const migrationDrizzleClient = drizzle(migrationPool, { schema });

console.log(`Migrating database ${env.DATABASE_URL}`);

await migrationPool.connect();

await migrate(migrationDrizzleClient, {
  migrationsFolder: join(__dirname, 'migrations'),
});

await migrationPool.end();

console.log('Migrated successfully.');
