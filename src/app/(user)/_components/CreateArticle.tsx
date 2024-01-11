"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";

const CreateArticle = () => {
    const session = useSession()

    return <div>
        {session.status === "loading" && <p>please wait</p>}
        {session.status === "unauthenticated" && <p><button>login</button> to write article</p>}
        {session.status === "authenticated" && <Link href="/articles/new" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-400 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            create a Article
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </Link>}
    </div>;
};
export default CreateArticle;