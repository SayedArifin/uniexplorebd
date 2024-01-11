import SubmitButton from "@/components/SubmitButton";
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Verified } from "lucide-react";

const Feedback = async () => {
    const feedback = await db.feedback.findMany({
        orderBy: {
            marked: "desc"
        }
    })
    const handleMarked = async (formData: FormData) => {
        "use server"
        const id = formData.get('id') as string;
        try {
            await db.feedback.update({
                where: {
                    id
                }, data: {
                    marked: true
                }
            })
            revalidatePath("/owner/feedback")
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    return <Accordion type="single" collapsible className="w-full">
        {feedback.map(st => (
            <AccordionItem key={st.id} value={st.id}>
                <AccordionTrigger className="justify-start items-center gap-2">{st.marked && <Verified />}{st.subject}</AccordionTrigger>
                <AccordionContent>
                    {st.msg}
                    {!st.marked && <form action={handleMarked}>
                        <input hidden name="id" value={st.id} />
                        <SubmitButton text={"Got it!"} />
                    </form>}
                </AccordionContent>
            </AccordionItem>


        ))}
    </Accordion>;
};

export default Feedback;