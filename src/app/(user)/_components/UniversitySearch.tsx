"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const UniversitySearch = ({ search }: { search: string }) => {
    const [searched, setSearch] = useState(search);
    const router = useRouter();
    useEffect(() => {
        const queryString = searched ? `?search=${encodeURIComponent(searched as string)}` : '';
        const url = `/universities${queryString}`;
        router.push(url);
    }, [searched, router]);
    return (
        <div className="box pt-6 scale-in-center">
            <div className="box-wrPageer">
                <div className="rounded flex items-center w-full p-3 shadow-sm border dark:border-gray-200 border-gray-900  ">
                    <div className="outline-none focus:outline-none cursor-pointer">
                        <svg
                            className="w-5 text-gray-600 h-5 cursor-pointer "
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search for University"
                        className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
                    />

                </div>
            </div>
        </div>
    );
};

export default UniversitySearch;