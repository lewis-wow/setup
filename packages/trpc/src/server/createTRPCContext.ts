import { getServerSession } from '@repo/authjs';
import { auth } from '@repo/authjs/next';
import { db } from '@repo/drizzle';
import * as schema from '@repo/drizzle/schema';
import { env } from '@repo/env';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Session } from 'next-auth';

export type CreateInnerTRPCContextArgs = {
  session: Session | null;
  db: NodePgDatabase<typeof schema>;
};

export const createInnerTRPCContext = ({
  session,
  db,
}: CreateInnerTRPCContextArgs) => {
  return {
    session,
    db,
    isTest: env.NODE_ENV === 'test',
  };
};

export const createTRPCContext = async ({
  req,
}: FetchCreateContextFnOptions) => {
  const session = await getServerSession(req);

  return createInnerTRPCContext({ session, db });
};

export const createNextTRPCCallerFactoryContext = async () => {
  const session = await auth();

  return createInnerTRPCContext({ session, db });
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
