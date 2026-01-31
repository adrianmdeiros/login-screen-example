import { users } from "@/db/schema";
import { eq } from 'drizzle-orm'
import { db } from "@/db/schema";
import { verifySession } from "@/lib/session";
import { cache } from "react";

export const getUserByEmail = cache(async (email: string) => {
    return await db
        .select()
        .from(users)
        .where(eq(users.email, email))
})

export const saveUser = async (user: any) => {
    return await db.insert(users).values({
        name: null,
        email: user.email,
        emailVerified: null,	
        password: user.password,
        role: user.role,
        image: user.avatarUrl
    }).returning({ id: users.id, role: users.role })
}

export const getUserById = cache(async (id: string) => {
    await verifySession()
    return await db
        .select({ name: users.name, email: users.email, role:users.role, image: users.image })
        .from(users)
        .where(eq(users.id, id))
})
