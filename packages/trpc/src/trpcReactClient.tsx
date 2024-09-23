import { makeQueryClient } from '@/queryClient';
import type { AppRouter } from '@/server/routes';
import { env } from '@repo/env';
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  splitLink,
} from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { useState } from 'react';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }

  if (clientQueryClientSingleton) {
    return clientQueryClientSingleton;
  }

  clientQueryClientSingleton = makeQueryClient();

  return clientQueryClientSingleton;
};

export type TRPCProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export const TRPCProvider = ({ children }: TRPCProviderProps) => {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition: (op) => isNonJsonSerializable(op.input),
          true: httpLink({
            transformer: superjson,
            url: env.NEXT_PUBLIC_TRPC_URL,
          }),
          false: httpBatchLink({
            transformer: superjson,
            url: env.NEXT_PUBLIC_TRPC_URL,
          }),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
