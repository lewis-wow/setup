import { createInnerTRPCContext } from '@/server/createTRPCContext';
import { appRouter } from '@/server/routes';
import { createCallerFactory } from '@/server/trpc';
import { integrationTest, seedDatabase } from '@repo/test';
import { beforeAll, expect } from 'vitest';

beforeAll(async () => {
  await seedDatabase();
});

integrationTest(
  'Should get undefined in me query when user is not logged in',
  async ({ db }) => {
    const unauthorizedTestCaller = createCallerFactory(appRouter)(
      createInnerTRPCContext({
        session: null,
        db,
      }),
    );

    const response = await unauthorizedTestCaller.user.me();

    expect(response).toMatchInlineSnapshot(`undefined`);
  },
);

integrationTest(
  'Should get user in me query when user is logged in',
  async ({ db }) => {
    const user = await db.query.users.findFirst();

    const authorizedTestCaller = createCallerFactory(appRouter)(
      createInnerTRPCContext({
        session: {
          user: user!,
          expires: 'never',
        },
        db,
      }),
    );

    const response = await authorizedTestCaller.user.me();

    expect(response).toMatchInlineSnapshot(
      {
        id: expect.any(String),
      },
      `
      {
        "email": null,
        "emailVerified": null,
        "id": Any<String>,
        "image": null,
        "name": "John",
      }
    `,
    );
  },
);
