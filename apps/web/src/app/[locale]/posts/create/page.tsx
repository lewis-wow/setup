'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@repo/trpc/trpcReactClient';
import { TextField } from '@repo/ui/components/TextField';
import { Button } from '@repo/ui/components/ui/button';
import { Form } from '@repo/ui/components/ui/form';
import { createPostSchema } from '@repo/validation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreatePostPage = () => {
  const t = useTranslations();

  const createPostMutation = trpc.post.create.useMutation();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  return (
    <main className="max-w-md m-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            createPostMutation.mutate(values);
          })}
          className="space-y-8"
        >
          <TextField
            form={form}
            name="title"
            label={t('pages.posts.create.titleField.label')}
          />
          <TextField
            form={form}
            name="content"
            label={t('pages.posts.create.contentField.label')}
          />

          <Button type="submit" disabled={createPostMutation.isPending}>
            {t('common.submit')}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default CreatePostPage;
