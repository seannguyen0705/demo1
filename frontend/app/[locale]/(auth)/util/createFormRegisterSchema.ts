// formSchema.ts

import { z } from 'zod';

export function createFormSchema(t: any) {
  return z
    .object({
      fullName: z
        .string()
        .min(2, { message: t('form-errors.fullName.min') })
        .max(50, { message: t('form-errors.fullName.max') }),
      email: z.string().email({ message: t('form-errors.email.invalid') }),
      password: z
        .string()
        .min(8, { message: t('form-errors.password.min') })
        .regex(/[A-Z]/, {
          message: t('form-errors.password.uppercase'),
        })
        .regex(/[a-z]/, {
          message: t('form-errors.password.lowercase'),
        })
        .regex(/[0-9]/, { message: t('form-errors.password.number') })
        .regex(/[^A-Za-z0-9]/, {
          message: t('form-errors.password.special'),
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('form-errors.confirmPassword.match'),
      path: ['confirmPassword'],
    });
}
