import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { parseDatabaseURL } from './utils/parseDatabaseURL';

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine((databaseURL) => {
        const parsedDatabaseURL = parseDatabaseURL(databaseURL);

        if (
          ['test', 'development'].includes(process.env.NODE_ENV!) &&
          !parsedDatabaseURL.host?.includes('localhost')
        ) {
          return false;
        }

        return true;
      }),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    AUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    WEB_SERVER_URL: z.string().url(),

    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_TRPC_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,

    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    NEXT_PUBLIC_TRPC_URL: process.env.NEXT_PUBLIC_TRPC_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
