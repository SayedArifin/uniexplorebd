import { db } from "@/lib/db";
import { User } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: User; account: any }) {
            if (account.provider === "google" && user.email) {
                try {
                    await db.user.upsert({
                        where: {
                            email: user.email,
                        },
                        create: {
                            email: user.email,
                            name: user.name,
                            image: user.image
                        }, update: {
                            name: user.name,
                            image: user.image,
                        }
                    })



                } catch (error) {
                    throw new Error("Something went wrong. Please try again");
                }
            }

            return user;
        },
    },
};