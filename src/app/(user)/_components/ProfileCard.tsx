import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

import { Card, CardHeader } from "@/components/ui/card";
import { Article, Bookmark } from "@prisma/client";
import { Edit2, Edit3, Eye, Trash } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
    bookmark?: Bookmark[];
    article?: Article[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ bookmark, article }) => {
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
                                <p className="truncate">{art.title}</p>
                                <div className="flex gap-2 justify-center items-center">
                                    <Link href={""}><Edit3 /></Link>
                                    <Button variant={"link"}><Trash /></Button>
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
                    <CardHeader>You didnt whote any article</CardHeader>
                </Card>}
                {bookmark?.map(bm => (
                    <Card key={bm.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <p className="truncate">{bm.bookmark_title}</p>
                                <div className="flex gap-2 justify-center items-center">
                                    <Link href={""}><Eye /></Link>
                                    <Button variant={"link"}><Trash /></Button>
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