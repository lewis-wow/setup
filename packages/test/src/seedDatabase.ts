import { db } from '@repo/drizzle';
import { users } from '@repo/drizzle/schema';

export const seedDatabase = async () => {
  await db.delete(users);

  const result = await db.transaction(async (tx) => {
    const seededUsers = await tx
      .insert(users)
      .values({ name: 'John' })
      .returning();

    return {
      seededUsers,
    };
  });

  return result;
};
