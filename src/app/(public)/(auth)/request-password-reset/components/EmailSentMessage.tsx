import { Mail } from 'lucide-react'
import React from 'react'

export function EmailSentMessage() {
    return (
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="font-medium">Check your email</p>
            <p className="text-sm text-muted-foreground">
                We've sent you a password reset link. Please check your inbox.
            </p>
        </div>
    )
}
