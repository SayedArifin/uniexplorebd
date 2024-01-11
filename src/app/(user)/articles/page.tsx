import { Suspense } from "react"
import Article from "./_components/Article"
import ArticleSk from "./_components/ArticleSk"
import Link from "next/link"
import CreateArticle from "../_components/CreateArticle"

const page = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Explore Inspiring Articles</h1>

            <CreateArticle />
            <Suspense fallback={<ArticleSk />}>
                <Article />
            </Suspense>
        </div>
    )
}

export default page
