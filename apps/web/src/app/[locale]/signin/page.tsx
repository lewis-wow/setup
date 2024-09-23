'use client';

import { TextField } from '@repo/ui/components/TextField';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Form } from '@repo/ui/components/ui/form';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const SignInPage = () => {
  const form = useForm<{
    email?: string;
    password?: string;
  }>();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log(values);
        })}
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <TextField
                label="Email"
                form={form}
                name="email"
                type="email"
                required
              />

              <TextField
                label="Password"
                form={form}
                name="password"
                required
                type="password"
                hint={
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                }
              />

              <Button type="submit" className="w-full">
                Sign in
              </Button>

              <Button variant="outline" className="w-full">
                Sign in with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default SignInPage;
