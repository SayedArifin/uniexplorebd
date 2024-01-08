"use client"
import { cn } from "@/lib/utils";
import {
    Navbar as NextUINavbar,

    NavbarItem,

} from "@nextui-org/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
interface SideConfigProps {
    siteConfig: any
}

const SideConfig: React.FC<SideConfigProps> = ({ siteConfig }) => {
    const pathname = usePathname()
    return <ul className="hidden lg:flex gap-4 justify-start ml-2">
        {siteConfig.navItems.map((item: { href: string, label: string }) => (
            <NavbarItem key={item.href}>
                <NextLink
                    className={cn(
                        "font-semibold", item.href === pathname && "font-bold text-primary"
                    )}
                    color="foreground"
                    href={item.href}
                >
                    {item.label}
                </NextLink>
            </NavbarItem>
        ))}
    </ul>;
};

export default SideConfig;