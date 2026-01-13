"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ResetPasswordForm } from "./components/ResetPasswordForm"


export default function RequestResetPasswordPage() {
    return (
        <div className="h-screen w-full items-center justify-center flex p-2">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
                    <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm />
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/">
                        <Button variant="link" className="px-0 font-normal">
                            Back to login
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}