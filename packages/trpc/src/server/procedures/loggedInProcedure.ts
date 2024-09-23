import { TRPCError } from '@trpc/server';
import { baseProcedure } from '../trpc';

export const loggedInProcedure = baseProcedure
  .meta({
    authRequired: true,
  })
  .use(({ ctx, next }) => {
    if (ctx.session === null) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next({
      ctx: {
        session: ctx.session,
      },
    });
  });
