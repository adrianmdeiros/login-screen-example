import { ChangePassword } from "./components/ChangePassword"

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token: string }> }) {
    const token = (await searchParams).token

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