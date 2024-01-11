"use client";
import { useState, useEffect, useRef, ReactNode } from 'react';
import { BiMenuAltLeft } from "react-icons/bi";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { ModeToggle } from './ToggleTheme';
import { useSession } from 'next-auth/react';
import { userRole } from '@/action';
import { toast } from 'sonner';

interface SidebarProps {
    children: React.ReactNode;
    sidebarItems: {
        icon: ReactNode;
        text: string;
        href: string;
    }[];
}

const AdvertizerSidebar: React.FC<SidebarProps> = ({ children, sidebarItems }) => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { status, data } = useSession();
    const [role, setRole] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated") {
                try {
                    const role = await userRole(data.user?.email);
                    setRole(role);

                    if (role !== "ADVERTIZER" && role !== "OWNER") {
                        toast.warning("Access Denied", {
                            description: "Oops! It seems like you don't have the necessary permissions to view this page. Please contact your Advertizeristrator for assistance."
                        });
                        router.push("/");
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                } finally {
                    setIsLoading(false);
                }
            } else if (status === "unauthenticated") {
                toast.warning("Access Denied", {
                    description: "Oops! It seems like you don't have the necessary permissions to view this page. Please contact your Advertizeristrator for assistance."
                });
                router.push("/");

            }
        };

        fetchData();
    }, [status, data?.user?.email, router]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isSidebarOpen && !sidebarRef.current?.contains(target)) {
                closeSidebar();
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSidebarOpen]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='min-h-screen'>
            <div
                className={`fixed inset-0 z-40 bg-black opacity-50 ${isSidebarOpen ? 'block' : 'hidden'}`}
                onClick={closeSidebar}
            ></div>

            <nav className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'shadow-lg' : ''}`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <BiMenuAltLeft size={25} className='mr-2' />
                            </button>
                            <div className="font-extrabold text-inherit text-2xl flex">
                                <Logo /><span className="text-xs text-primary hidden md:block">Advertizer-{data?.user?.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {sidebarItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className={cn(`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`, pathname === item.href && "bg-gray-100 dark:bg-gray-700 group")}>
                                    {item.icon}
                                    <span className="ms-3 flex-1 whitespace-nowrap">{item.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className={`p-4 sm:ml-64 `}>
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14 ">
                    <div className=''>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AdvertizerSidebar;
