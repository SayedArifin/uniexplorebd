import { db } from "@/lib/db"
import Image from "next/image";
import Link from "next/link"


const Article = async () => {
    const articles = await db.article.findMany()
    const truncateText = (text: string, maxWords: number) => {
        const words = text.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return text;
    };
    return (
        <div>
            <section className="">
                <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12" >

                    <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" >
                        {articles.map(article => (
                            <Link key={article.id} rel="noopener noreferrer" href={"/articles/" + article.id} className="max-w-sm mx-auto  group hover:no-underline focus:no-underline dark:bg-gray-900">
                                <Image alt={article.title} width={270} height={70} className="object-cover w-full rounded h-44 dark:bg-gray-500" src={article.imageUrl} />
                                <div className="p-6 space-y-2" >
                                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline text-primary">{article.title}</h3>
                                    <span className="text-xs dark:text-gray-400">{article.createdAt.toLocaleString()}</span>
                                    <p>{truncateText(article.introduction, 20)}</p>
                                </div>
                            </Link>
                        ))}


                    </div>

                </div>
            </section>
        </div>
    )
}

export default Article
