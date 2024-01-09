import { db } from "@/lib/db";
import Image from "next/image";
import Markdown from "react-markdown";


const SinglePost = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const article = await db.article.findUnique({
        where: { id }, include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return <div className="p-5 mx-auto sm:p-10 md:p-16 " >
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded" >
            <Image src={article?.imageUrl!} width={800} height={96} alt="" className="w-full h-60 sm:h-96 dark:bg-gray-500" />
            <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-900 bg-gray-200" >
                <div className="space-y-2" >
                    <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">{article?.title}</a>
                    <p className="text-xs dark:text-gray-400">By
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">{article?.author.name}</a>
                    </p>
                </div>
                <div className="dark:text-gray-100 prose" >
                    <Markdown>{article?.content}</Markdown>
                </div>
            </div>
        </div>
    </div>;
};

export default SinglePost;