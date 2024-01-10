"use client"
import { VisibilityBookmark, deleteArticle, deleteBookmark } from "@/action";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

import { Card, CardHeader } from "@/components/ui/card";
import { Article, Bookmark } from "@prisma/client";
import { Edit3, Eye, EyeOff, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProfileCardProps {
    bookmark?: Bookmark[];
    article?: Article[];
}



const ProfileCard: React.FC<ProfileCardProps> = ({ bookmark, article }) => {

    const router = useRouter()
    const handleDeleteArticle = async (id: string) => {

        try {
            const res = await deleteArticle(id);
            toast.success(res.title + " deleted successfully")
            router.refresh()
        } catch (error) {
            toast.error("something went wrong")
        }
    }
    const handleDeleteBookmark = async (id: string) => {

        try {
            const res = await deleteBookmark(id);
            toast.success(res.bookmark_title + " deleted successfully")
            router.refresh()
        } catch (error) {
            toast.error("something went wrong")
        }
    }
    const handleVisibilityBookmark = async (id: string, is_visible: boolean) => {

        try {
            const res = await VisibilityBookmark(id, is_visible);
            toast.success(res.bookmark_title + " visibility changed successfully")
            router.refresh()
        } catch (error) {
            toast.error("something went wrong")
        }
    }
    return <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger>Your Article</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
                {article?.length === 0 && <Card>
                    <CardHeader>You didnt whote any article</CardHeader>
                </Card>}
                {article?.map(art => (
                    <Card key={art.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <Link className="hover:underline truncate" href={"/articles/" + art.id}>{art.title}</Link>
                                <div className="flex gap-2 justify-center items-center">
                                    <Link href={"/articles/edit/" + art.id}><Edit3 /></Link>

                                    <Button onClick={() => handleDeleteArticle(art.id)} type="submit" variant={"link"}><Trash /></Button>

                                </div>
                            </div>

                        </CardHeader>
                    </Card>
                ))}
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger>Your Bookmark</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5">
                {bookmark?.length === 0 && <Card>
                    <CardHeader>You didnt saved any bookmark</CardHeader>
                </Card>}
                {bookmark?.map(bm => (
                    <Card key={bm.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <Link href={"/compare/" + bm.id} className="truncate hover:underline">{bm.bookmark_title}</Link>
                                <div className="flex gap-2 justify-center items-center">
                                    <Button onClick={() => handleVisibilityBookmark(bm.id, !bm.is_visible)} variant={"link"}>{bm.is_visible ? <Eye /> : <EyeOff />}</Button>
                                    <Button onClick={() => handleDeleteBookmark(bm.id)} variant={"link"}><Trash /></Button>
                                </div>
                            </div>

                        </CardHeader>
                    </Card>
                ))}
            </AccordionContent>
        </AccordionItem>

    </Accordion>;
};

export default ProfileCard;