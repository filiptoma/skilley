import dayjs from 'dayjs';
import { z } from 'zod';

export const CheckboxSchema = z.boolean().default(false);

export const DateSchema = z.preprocess(
  (arg) => (typeof arg === 'string' ? dayjs(arg) : arg),
  z.date(),
) as z.ZodEffects<z.ZodDate, Date, Date>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  company: CheckboxSchema,
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
