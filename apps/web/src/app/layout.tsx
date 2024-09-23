import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@repo/ui/globals.css';

export const metadata: Metadata = {
  title: 'Title',
  description: 'Description',
};

export type AppLayoutProps = Readonly<{
  children: ReactNode;
}>;

const AppLayout = ({ children }: AppLayoutProps) => children;

export default AppLayout;
