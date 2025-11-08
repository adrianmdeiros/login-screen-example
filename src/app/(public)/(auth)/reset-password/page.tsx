import { ChangePassword } from "./components/ChangePassword"

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
    const token = searchParams?.token ?? ''

    if (!token) {
        return (
            <main className="p-6">
                <h1>Link inválido</h1>
                <p>Solicite um novo link para redefinir sua senha.</p>
            </main>
        )
    }

    return (
        <div className="h-screen w-full items-center justify-center flex p-2">
            <ChangePassword token={token} />
        </div>
    )
}