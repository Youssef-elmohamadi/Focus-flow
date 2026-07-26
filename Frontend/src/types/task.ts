import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.coerce.string(),
  title: z.string(),
  body: z.string(),
  isExcuted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().optional().nullable(),
}).transform(data => ({
  id: data.id,
  title: data.title,
  body: data.body,
  isExecuted: data.isExcuted,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
}));

export type Task = z.infer<typeof TaskSchema>;
