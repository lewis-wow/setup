import NextAuth, { type NextAuthResult } from 'next-auth';
import { authConfig } from './config';

const nextAuth = NextAuth(authConfig);

export const auth: NextAuthResult['auth'] = nextAuth.auth;
export const signIn: NextAuthResult['signIn'] = nextAuth.signIn;
export const signOut: NextAuthResult['signOut'] = nextAuth.signOut;
export const handlers: NextAuthResult['handlers'] = nextAuth.handlers;
