import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

type User = {
    name: string | null
    email: string | null
    image: string | null
}

type UserCardProps = {
    user: User
}

export default function UserCard({ user: { name, email, image } }: UserCardProps) {
    return (
        <Card>
            <CardHeader className="flex justify-center items-center">
                {image ?
                    <Image
                        src={image}
                        alt="User Avatar"
                        className="rounded-full"
                        width={64}
                        height={64}
                    />
                    :
                    <div className="rounded-full cursor-pointer">
                        <User className="w-16 h-16 border rounded-full p-3" />
                    </div>
                }
            </CardHeader>
            <CardContent className="font-semibold flex flex-col items-center">
                <span>{name ?? 'User'}</span>
                <span>{email}</span>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <LogoutButton />
            </CardFooter>
        </Card>
    )
}
