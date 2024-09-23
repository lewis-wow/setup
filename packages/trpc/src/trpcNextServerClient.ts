import 'server-only';
import { makeQueryClient } from '@/queryClient';
import { appRouter } from '@/server/routes';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { createNextTRPCCallerFactoryContext } from './server/createTRPCContext';
import { createCallerFactory } from './server/trpc';

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(
  createNextTRPCCallerFactoryContext,
);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
