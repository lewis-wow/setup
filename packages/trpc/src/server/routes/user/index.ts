import { createTRPCRouter } from '@/server/trpc';
import { listUsersQuery } from './listUsersQuery';
import { meQuery } from './meQuery';

export const userRouter = createTRPCRouter({
  list: listUsersQuery,
  me: meQuery,
});
