// userSchema.ts
// Zod schema for user creation request validation

import { z } from 'zod';

export const addUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    email: z.email()
}).strict(); // .strict() ensures no extra fields are allowed


export const userLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, 'passowrd is required')
}).strict();

export type AddUserInput = z.infer<typeof addUserSchema>;
export type loginSchemaType = z.infer<typeof userLoginSchema>;
