import { authOptions } from "@/app/option"
import SubmitButton from "@/components/SubmitButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { Input, Textarea } from "@nextui-org/react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
const page = async () => {
    const session = await getServerSession(authOptions);
    const handleSubmit = async (formData: FormData) => {
        "use server"
        const title = formData.get('title') as string;
        const introduction = formData.get('introduction') as string;
        const imageUrl = formData.get('imageUrl') as string;
        const content = formData.get('content') as string;
        if (session?.user?.email) {
            const res = await db.article.create({
                data: {
                    title, introduction, imageUrl, content, authorEmail: session?.user?.email
                }
            })
            redirect(res.id)
        }

    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add new Article</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-2" action={handleSubmit}>
                    <Input name="title" label="Article Title" variant="underlined" validationBehavior="native" isRequired />
                    <Input name="introduction" label="Article Introduction" variant="underlined" validationBehavior="native" isRequired />
                    <Input name="imageUrl" type="url" placeholder="Only Unsplash and Image Post link allowed" label="Article Image Url" variant="underlined" validationBehavior="native" isRequired />
                    <Textarea name="content" placeholder="write markdown content" label="Article content" variant="underlined" validationBehavior="native" isRequired />
                    <SubmitButton text="Upload Article" />
                </form>
            </CardContent>

        </Card>
    )
}

export default page
