import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Link from "next/link";
import { ModeToggle } from "@/components/ToggleTheme";
import { siteConfig } from "@/constant/sidebar";
import Logo from "@/components/Logo";
import SideConfig from "./SideConfig";
const Navbar = () => {
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink href="/">
                        <div className="flex justify-start items-center gap-1">
                            <Logo />
                        </div>
                    </NextLink>
                </NavbarBrand>
                <SideConfig siteConfig={siteConfig} />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                    <ModeToggle />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ModeToggle />
                <NavbarMenuToggle />
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarMenu>
                {siteConfig.navItems.map((item: { href: string, label: string }) => (
                    <NavbarMenuItem key={item.href}>
                        <NextLink href={item.href}>
                            <Link href={item.href}
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                            >
                                {item.label}
                            </Link>
                        </NextLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </NextUINavbar>
    );
};

export default Navbar;