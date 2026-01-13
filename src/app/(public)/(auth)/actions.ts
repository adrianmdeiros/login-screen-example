'use server'

import { compare, hash } from 'bcryptjs'
import { ResetPasswordEmailSchema, ResetPasswordSchema, SignInFormSchema, SignUpFormSchema } from '@/lib/definitions'
import { signIn as OAuthSignIn } from '@/auth'
import { createSession } from '@/lib/session'
import { getUserByEmail, saveUser } from '@/data/user'
import { randomBytes, createHash } from 'crypto'
import { db, passwordResets, users } from '@/db/schema'
import { eq, gt, and } from 'drizzle-orm'
import { log } from 'console'

export async function signUp(_: unknown, formData: FormData) {
    const validatedFields = SignUpFormSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fieldData: {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                confirmPassword: formData.get('confirmPassword') as string
            }
        }
    }

    const user = await getUserByEmail(validatedFields.data.email)

    if (user.length > 0) {
        return {
            success: false,
            message: 'User already exists.',
            fieldData: {
                email: formData.get('email') as string
            }
        }
    }

    const hashedPassword = await hash(validatedFields.data.password, 10)

    const newUser = await saveUser({
        email: validatedFields.data.email,
        password: hashedPassword,
        avatarUrl: null
    })

    await createSession(newUser[0].id)

}

export async function signIn(_: unknown, formData: FormData) {
    const validatedFields = SignInFormSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fieldData: {
                email: formData.get('email') as string,
                password: formData.get('password') as string
            }
        }
    }

    const user = await getUserByEmail(validatedFields.data.email)

    if (user.length === 0) {
        return {
            success: false,
            message: 'User not found.',
            fieldData: {
                email: formData.get('email') as string,
                password: formData.get('password') as string
            }
        }
    }

    if (!user[0].password) {
        return {
            success: false,
            message: 'User already exists. Maybe you already signed up with Google.',
            fieldData: {
                email: formData.get('email') as string,
            }
        }
    }

    const checkPassword = await compare(validatedFields.data.password, user[0].password!)

    if (!checkPassword) {
        return {
            success: false,
            message: 'Incorrect password.',
            fieldData: {
                email: formData.get('email') as string,
            }
        }
    }

    await createSession(user[0].id)

}

export async function GoogleSignIn() {
    return await OAuthSignIn('google', { redirectTo: '/user' })
}

export async function requestPasswordReset(_: unknown, formData: FormData) {
    const validatedFields = ResetPasswordEmailSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fieldData: {
                email: formData.get('email') as string,
            }
        }
    }

    const [user] = await getUserByEmail(validatedFields.data.email)

    if (!user) {
        return {
            success: false,
            message: 'User not found.',
            fieldData: {
                email: formData.get('email') as string,
            }
        }
    }

    const token = randomBytes(32).toString('base64url')
    const tokenHash = createHash('sha256').update(token).digest('hex')
    const expires = new Date(Date.now() + 1000 * 30 * 60)
    await db.insert(passwordResets).values({
        userId: user.id,
        token: tokenHash,
        expires,
        used: false,
        createdAt: new Date()
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${encodeURIComponent(token)}`

    try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/request-password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resetUrl, userEmail: user.email })
        })

        return {
            success: true,
            message: 'Deu certo meu bom. O e-mail de redefinição foi enviado pa tu.'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Erro ao enviar e-mail de redefinição de senha pa tu.'
        }
    }

}

export async function changePassword(_: unknown, formData: FormData) {
    const validatedFields = ResetPasswordSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fieldData: {
                password: formData.get('password') as string,
                confirmPassword: formData.get('confirmPassword') as string
            }
        }
    }

    const token = formData.get('token') as string
    const tokenHash = createHash('sha256').update(token).digest('hex')

    const [record] = await db
        .select()
        .from(passwordResets)
        .where(
            and(
                eq(passwordResets.token, tokenHash),
                eq(passwordResets.used, false),
                gt(passwordResets.expires, new Date())
            )
        )
        .limit(1)

    if (!record) {
        return {
            success: false,
            message: 'Cara, esse token não vale mais.'
        }
    }

    const newHashedPassword = await hash(validatedFields.data.password, 10)

    await db
        .update(users)
        .set({ password: newHashedPassword })
        .where(eq(users.id, record.userId))

    await db
        .update(passwordResets)
        .set({ used: true })
        .where(eq(passwordResets.id, record.id))

    return {
        success: true,
        message: 'Deu tudo certo meu bom! Já pode usar a senha nova!'
    }
}
