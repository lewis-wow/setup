import { createTRPCRouter } from '@/server/trpc';
import { createPostMutation } from './createPostMutation';
import { listPostsQuery } from './listPostsQuery';

export const postRouter = createTRPCRouter({
  list: listPostsQuery,
  create: createPostMutation,
});
