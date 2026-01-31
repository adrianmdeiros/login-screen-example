import { getUserById } from "@/data/user";
import Link from "next/link";
import { verifyRole, verifySession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await verifySession()
  const { role } = await verifyRole()

  const [user] = await getUserById(session.userId)

  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        User not found
        <Link href='/' className="text-blue-500 font-semibold">
          Go back
        </Link>
      </div>
    )
  }


  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <h1>Dashboard</h1>
      <br />
      {role === 'admin' &&
        <p className="text-white">Funcionalidade somente visivel para admin</p>  
      }
      <br />
      <p className="text-white">Funcionalidade comum</p>
    </div>
  )
}
