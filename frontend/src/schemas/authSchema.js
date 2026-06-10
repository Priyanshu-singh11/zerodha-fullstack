import { z } from 'zod'

export const signupSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(15, 'Username too long'),

    email: z.string()
        .email('Invalid email address'),

    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(15, 'Password too long')
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d).+$/,
            "Password must contain letters and numbers"
        )
})


export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(6, 'Incorrect password')
        .max(15, 'Incorrect password')
})