import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import type { TRPCContext } from './createTRPCContext';
import type { TRPCMeta } from './trpcMeta';

const t = initTRPC
  .context<TRPCContext>()
  .meta<TRPCMeta>()
  .create({
    defaultMeta: {
      authRequired: false,
    },
    transformer: superjson,
    errorFormatter(opts) {
      const { shape, error } = opts;
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      };
    },
  });

export const createTRPCRouter = t.router;
export const baseProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
