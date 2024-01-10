import SubmitButton from "@/components/SubmitButton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";


const EditorArticle = async () => {
    const blogs = await db.article.findMany({
        select: {
            id: true, title: true,
        }
    })
    const handleDelete = async (formData: FormData) => {
        "use server"
        const id = formData.get('id') as string;

        await db.article.delete({
            where: { id }
        })
        revalidatePath("/editor/article")
    }
    return <div className="flex flex-col gap-2">
        {blogs.length == 0 && <p>no article availabe</p>}
        {blogs.map(blog => (
            <Card key={blog.id}>
                <CardHeader className="flex justify-between flex-row items-center">
                    <CardTitle className="truncate">{blog.title}</CardTitle>
                    <form action={handleDelete}>
                        <input name={"id"} type="hidden" value={blog.id} />
                        <SubmitButton text={<Trash2 />} />
                    </form>
                </CardHeader>
            </Card>
        ))}
    </div>;
};

export default EditorArticle;