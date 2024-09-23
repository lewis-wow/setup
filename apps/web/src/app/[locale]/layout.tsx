import { auth } from '@repo/authjs/next';
import { getMessages } from 'next-intl/server';
import { type ReactNode } from 'react';
import { Providers } from '../../Providers';

export type ProvidersLayoutProps = Readonly<{
  children: ReactNode;
  params: { locale: string };
}>;

const RootLayout = async ({
  children,
  params: { locale },
}: ProvidersLayoutProps) => {
  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={locale}>
      <body>
        <Providers messages={messages} locale={locale} session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
