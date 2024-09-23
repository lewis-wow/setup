import { fetchRequestHandler as trpcFetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from './createTRPCContext';
import { appRouter } from './routes';

export const fetchRequestHandler = (req: Request) => {
  return trpcFetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
};
