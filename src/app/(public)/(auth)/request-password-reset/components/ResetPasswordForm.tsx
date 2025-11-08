'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { requestPasswordReset } from "../../actions";
import { EmailSentMessage } from "./EmailSentMessage";
import Loading from "@/app/loading";

export function ResetPasswordForm() {
    const [state, formAction, pending] = useActionState(requestPasswordReset, undefined)
    
    return (
        <>
            {state?.success ?
                <EmailSentMessage />
                :
                <form action={formAction} className="space-y-4">
                    {state?.success === false &&
                        <p className="text-yellow-500 font-semibold text-sm">
                            {state?.message}
                        </p>
                    }
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            aria-describedby="email-error"
                        />
                        {state?.errors?.email && (
                            <p id="email-error" className="text-sm font-medium text-yellow-500">
                                {state?.errors?.email[0]}
                            </p>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? <Loading /> : "Send reset link"}
                    </Button>
                </form>
            }
        </>
    )
}
