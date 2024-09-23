import { createTRPCRouter } from '@/server/trpc';
import { fileRouter } from './file';
import { postRouter } from './post';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  user: userRouter,
  file: fileRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
