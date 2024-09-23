import { auth } from '@repo/authjs/next';
import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';

export type PostsLayoutProps = Readonly<{
  children: ReactNode;
}>;

const PostsLayout = async ({ children }: PostsLayoutProps) => {
  const session = await auth();

  if (session === null) {
    return redirect('/');
  }

  return children;
};

export default PostsLayout;
