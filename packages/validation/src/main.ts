import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const IDSchema = z.object({
  id: z.string(),
});

export const userSchema = IDSchema.extend({
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
});

export const uploadFileSchema = zfd.formData({
  name: zfd.text(),
  image: zfd.file(),
});

export const createPostSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export const postSchema = IDSchema.extend({
  title: z.string(),
  content: z.string().nullable(),
  userId: z.string(),
});

export const paginationInputSchema = z
  .object({
    pageIndex: z.number().int(),
    pageSize: z.number().int(),
  })
  .optional();

export const paginationEnvelopeSchema = z.object({
  data: z.unknown(),
  rowCount: z.number().int(),
});
