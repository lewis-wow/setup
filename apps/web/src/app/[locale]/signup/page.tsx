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

const SignUpPage = () => {
  const form = useForm<{
    firstName?: string;
    lastName?: string;
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
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  form={form}
                  name="firstName"
                  label="First name"
                  required
                />

                <TextField
                  form={form}
                  name="lastName"
                  label="Last name"
                  required
                />
              </div>

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
                type="password"
                required
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
                Sign up
              </Button>

              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="#" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default SignUpPage;
