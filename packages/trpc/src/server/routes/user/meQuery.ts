import { baseProcedure } from '@/server/trpc';
import { userSchema } from '@repo/validation';

export const meQuery = baseProcedure
  .output(userSchema.optional())
  .query(({ ctx }) => {
    const user = ctx.session?.user;

    console.log(user);

    return user;
  });
