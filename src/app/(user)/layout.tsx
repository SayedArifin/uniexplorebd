
import { Metadata } from "next";
import { siteConfig } from "@/constant/sidebar";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;

}) {
    return (


        <div className="relative flex flex-col  ">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
            </main>
            <Footer />
        </div>


    );
}