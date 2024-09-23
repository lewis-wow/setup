import { baseProcedure } from '@/server/trpc';
import { IDSchema, uploadFileSchema } from '@repo/validation';
import { z } from 'zod';

export const uploadFileMutation = baseProcedure
  .input(
    z.object({
      formData: uploadFileSchema,
    }),
  )
  .output(IDSchema)
  .mutation(({ input }) => {
    console.log(input.formData.image);

    return { id: '' };
  });
