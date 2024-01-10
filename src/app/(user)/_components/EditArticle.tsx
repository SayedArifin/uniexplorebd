"use client"

import { fetchArticle, updateArticle } from "@/action";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditArticleProps {
    id: string
}

const EditArticle: React.FC<EditArticleProps> = ({ id }) => {
    const [title, setTitle] = useState("")
    const [introduction, setIntroduction] = useState("")
    const [imageUrl, setUrl] = useState("")
    const [content, setContent] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [authorEmail, setAuthorEmail] = useState("")

    const router = useRouter()
    const { data } = useSession()

    if (!data) {
        toast.error("Please Login before update")
        notFound()
    }

    const handleSubmit = async () => {
        if (title === "" || introduction === "" || imageUrl === "" || content === "") {
            toast.warning("All the feilds are required")
        } else {
            try {
                setIsDisabled(true)
                const res = await updateArticle(id, title, introduction, imageUrl, content)
                toast.success("Updated article")
                router.push("/articles/" + res.id)
            } catch (error) {
                toast.error("Something went wrong refreshing page")
                router.refresh()

            }
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchArticle(id);
            if (res) {
                setTitle(res.title);
                setIntroduction(res.introduction);
                setUrl(res.imageUrl);
                setContent(res.content);
                setAuthorEmail(res.authorEmail);
                setIsDisabled(false);

                // Compare email addresses after setting the state
                if (!(data.user?.email === res.authorEmail)) {
                    toast.info("You can not edit this article");
                    router.back();
                }
            } else {
                notFound();
            }
        };

        fetch();
    }, [id, data, router]);
    return <div>
        <Input isDisabled={isDisabled} name="title" label="Article Title" value={title} onChange={e => setTitle(e.target.value)} variant="underlined" validationBehavior="native" isRequired />
        <Input isDisabled={isDisabled} name="introduction" label="Article Introduction" value={introduction} onChange={e => setIntroduction(e.target.value)} variant="underlined" validationBehavior="native" isRequired />
        <Input isDisabled={isDisabled} name="imageUrl" type="url" value={imageUrl} onChange={e => setUrl(e.target.value)} placeholder="Only Unsplash and Image Post link allowed" label="Article Image Url" variant="underlined" validationBehavior="native" isRequired />
        <Textarea isDisabled={isDisabled} name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="write markdown content" label="Article content" variant="underlined" validationBehavior="native" isRequired />
        <Button type="submit" onClick={handleSubmit} className="w-full" disabled={isDisabled}>{isDisabled ? "please Wait" : "Update Article"}</Button>

    </div>;
};

export default EditArticle;