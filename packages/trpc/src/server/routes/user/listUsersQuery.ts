import { baseProcedure } from '@/server/trpc';
import { userSchema } from '@repo/validation';
import { z } from 'zod';

export const listUsersQuery = baseProcedure
  .output(z.array(userSchema))
  .query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findMany();

    return users;
  });
