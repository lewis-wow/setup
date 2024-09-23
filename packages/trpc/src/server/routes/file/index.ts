import { createTRPCRouter } from '@/server/trpc';
import { uploadFileMutation } from './uploadFileMutation';

export const fileRouter = createTRPCRouter({
  uploadFile: uploadFileMutation,
});
