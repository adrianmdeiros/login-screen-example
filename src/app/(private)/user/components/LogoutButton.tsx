'use client'

import Loading from "@/app/loading"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    
    async function handleLogout() {
        setIsLoading(true)
        
        const res = await fetch('/api/auth/logout', { method: 'POST' })
        
        if (res.ok) {
            toast.success('Logged out sucessfully')
            router.push('/')
        } else {
            toast.error('Loogout failed')
        }

        setIsLoading(false)
    }

    return (
        <button>
            {isLoading ?
                <Loading />
                :
                <LogOut
                    onClick={handleLogout}
                    className="cursor-pointer text-red-700 hover:text-red-600"
                />
            }
        </button>
    )
}
