import { Auth } from '@auth/core';
import { env } from '@repo/env';
import type { Account, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { authConfig } from './config';

export const envelopedAuth = ({ request }: { request: Request }) =>
  Auth(request, authConfig);

export const getServerSession = async (
  req: Request,
): Promise<Session | null> => {
  const url = new URL(
    `${env.NEXTAUTH_URL}${authConfig.basePath ?? '/api/auth'}/session`,
  );

  const response = await envelopedAuth({
    request: new Request(url, {
      headers: {
        cookie: req.headers.get('cookie') ?? '',
      },
    }),
  });

  const { status = 200 } = response;

  const data = await response.json();

  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;

  throw new Error(data.message);
};

export type { Session, User, Account, JWT };
