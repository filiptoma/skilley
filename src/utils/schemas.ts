import dayjs from 'dayjs';
import { z } from 'zod';

export const CheckboxSchema = z.boolean().default(false);

export const DateSchema = z.preprocess(
  (arg) => (typeof arg === 'string' ? dayjs(arg) : arg),
  z.date(),
) as z.ZodEffects<z.ZodDate, Date, Date>;

export const NumberSchema = z
  .string()
  .regex(/^[1-9]\d*$/)
  .transform((v) => Number(v));

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  company: CheckboxSchema,
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const JobSkillSchema = z.union([
  z.literal('JUNIOR'),
  z.literal('MEDIOR'),
  z.literal('SENIOR'),
]);
export type TJobSkill = z.infer<typeof JobSkillSchema>;

export const JobPlaceSchema = z.union([
  z.literal('BRATISLAVA'),
  z.literal('BRNO'),
  z.literal('REMOTE'),
]);
export type TJobPlace = z.infer<typeof JobPlaceSchema>;

export const JobFormSchema = z.union([
  z.literal('FULLTIME'),
  z.literal('PARTTIME'),
  z.literal('INTERNSHIP'),
  z.literal('FREELANCE'),
]);
export type TJobForm = z.infer<typeof JobFormSchema>;

export const JobTagSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type TJobTag = z.infer<typeof JobTagSchema>;

export const NewTagSchema = z.object({
  name: z.string(),
});

export const NewOfferSchema = z.object({
  name: z.string(),
  skill: JobSkillSchema,
  tags: JobTagSchema.array(),
  place: JobPlaceSchema,
  form: JobFormSchema,
  wage: NumberSchema,
  start: z.date(),
  description: z.string(),
  requirements: z.string(),
  offering: z.string(),
});

// z.setErrorMap((issue) => {
//   switch (issue.code) {
//     case 'invalid_type':
//       return { message: 'Požadováno' };
//     case 'too_small': {
//       if (issue.type === 'string' && issue.minimum === 1)
//         return { message: 'Požadováno' };
//       if (issue.type === 'array' && issue.minimum === 1)
//         return { message: 'Alespoň jedna hodnota je požadována' };
//     }
//   }
//   return { message: 'Neplatná hodnota' };
// });
