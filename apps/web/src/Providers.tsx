'use client';

import { TRPCProvider } from '@repo/trpc/trpcReactClient';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import type { ReactNode } from 'react';

export type ProvidersProps = {
  messages?: AbstractIntlMessages;
  locale?: string;
  session?: Session | null;
  children: ReactNode;
};

export const Providers = ({
  messages,
  session,
  locale,
  children,
}: ProvidersProps) => (
  <TRPCProvider>
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </NextIntlClientProvider>
  </TRPCProvider>
);
