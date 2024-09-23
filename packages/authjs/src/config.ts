import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@repo/drizzle';
import { env } from '@repo/env';
import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const authConfig: NextAuthConfig = {
  debug: env.NODE_ENV === 'development',
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  trustHost: true,
  secret: env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        if (session?.name) token.name = session.name;
        if (session?.image) token.image = session.image;

        return token;
      }

      const isSignIn = user ? true : false;

      if (!isSignIn) return token;

      return {
        ...token,
        id: user.id!,
        image: user.image,
        name: user.name,
        emailVerified: user.emailVerified,
      };
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          emailVerified: token.emailVerified,
        },
      };
    },
  },
};
