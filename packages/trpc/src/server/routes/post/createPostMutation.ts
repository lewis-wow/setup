import { loggedInProcedure } from '@/server/procedures/loggedInProcedure';
import { posts } from '@repo/drizzle/schema';
import { createPostSchema, postSchema } from '@repo/validation';

export const createPostMutation = loggedInProcedure
  .input(createPostSchema)
  .output(postSchema)
  .mutation(async ({ input, ctx }) => {
    const [post] = await ctx.db
      .insert(posts)
      .values({
        title: input.title,
        content: input.content,
        userId: ctx.session.user.id,
      })
      .returning();

    return post!;
  });
