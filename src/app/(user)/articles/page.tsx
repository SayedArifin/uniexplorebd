import { Suspense } from "react"
import Article from "./_components/Article"
import ArticleSk from "./_components/ArticleSk"
import Link from "next/link"

const page = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Explore Inspiring Articles</h1>

            <Link href="/articles/new" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-400 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                create a Article
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
            <Suspense fallback={<ArticleSk />}>
                <Article />
            </Suspense>
        </div>
    )
}

export default page
