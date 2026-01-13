import { NextRequest } from "next/server";
import { Resend } from 'resend';
import { EmailTemplate } from '../../../(public)/(auth)/request-password-reset/components/EmailTemplate'

if (!process.env.EMAIL_FROM) {
    throw new Error('EMAIL_FROM não está definido nas variáveis de ambiente')
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    const data = await request.json()
    const { resetUrl, userEmail } = data
    console.log(userEmail);

    if (!resetUrl) {
        return Response.json(
            { message: 'Reset URL é obrigatória' },
            { status: 400 }
        )
    }

    if (!userEmail) {
        return Response.json(
            { message: 'O email do usuário é obrigatório.' },
            { status: 400 }
        )
    }

    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: [userEmail],
            subject: 'Redefinição de senha.',
            react: EmailTemplate({ resetUrl })
        })

        if (error) {
            return Response.json({ message: 'Erro ao enviar e-mail com resend.' }, { status: 500 })
        }

        return Response.json(data)
    } catch (error) {
        return Response.json(
            { message: 'Erro ao enviar email de redefinição' },
            { status: 500 }
        )
    }
}