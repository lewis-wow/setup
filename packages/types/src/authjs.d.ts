import { DefaultSession, Session, User } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    emailVerified: Date | null;
  }
}

declare module 'next-auth' {
  interface User {
    emailVerified: Date | null;
  }

  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      emailVerified: Date | null;
    };
  }
}
