import { auth } from '@repo/authjs/next';
import { redirect } from 'next/navigation';
import { IndexClientPage } from './IndexClientPage';

const IndexPage = async () => {
  const session = await auth();

  if (session === null) {
    return redirect('/signin');
  }

  return <IndexClientPage />;
};

export default IndexPage;
