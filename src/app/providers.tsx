"use client"
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react'
export interface ProvidersProps {
    children: React.ReactNode;

}
export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>

        </SessionProvider>

    );
}