"use client"
import { useState, useEffect, useRef, ReactNode } from 'react';
import { BiMenuAltLeft } from "react-icons/bi";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ToggleTheme';

interface SidebarProps {
    children: React.ReactNode;
    sidebarItems: {
        icon: ReactNode;
        text: string;
        href: string;
    }[];
}

const RepresentativeSidebar: React.FC<SidebarProps> = ({ children, sidebarItems }) => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { status, data } = useSession();
    useEffect(() => {

    })

    return (
        <div className='min-h-screen'>
            <div
                className={`fixed inset-0 z-40 bg-black opacity-50 ${isSidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <nav className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'shadow-lg' : ''}`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <BiMenuAltLeft size={25} className='mr-2' />
                            </button>
                            <div className="font-extrabold text-inherit text-2xl flex">
                                <Logo /><span className="text-xs text-primary-600 hidden md:block">Representative-{data?.user?.name}</span>
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
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default RepresentativeSidebar;
