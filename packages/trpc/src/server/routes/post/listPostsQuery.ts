import { loggedInProcedure } from '@/server/procedures/loggedInProcedure';
import { createPaginationEnvelope } from '@/utils/createPaginationEnvelope';
import { posts as postsSchema } from '@repo/drizzle/schema';
import {
  paginationEnvelopeSchema,
  paginationInputSchema,
  postSchema,
} from '@repo/validation';
import { z } from 'zod';

export const listPostsQuery = loggedInProcedure
  .input(
    z
      .object({
        pagination: paginationInputSchema,
      })
      .optional(),
  )
  .output(
    paginationEnvelopeSchema.extend({
      data: z.array(postSchema),
    }),
  )
  .query(async ({ input, ctx }) => {
    const posts = await ctx.db.query.posts.findMany({
      where: (post, { eq }) => eq(post.userId, ctx.session.user.id),
      offset: input?.pagination
        ? input.pagination.pageIndex * input.pagination.pageSize
        : undefined,
      limit: input?.pagination?.pageSize,
    });

    const result = await createPaginationEnvelope({
      data: posts,
      source: postsSchema,
    });

    return result;
  });
