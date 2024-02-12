import { authOptions } from "@/app/option";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Answer from "./Answer";


const Question = async () => {
    const session = await getServerSession(authOptions)
    const questions = await db.question.findMany({
        where: {
            university: {
                Representative: {
                    loggedinEmail: session?.user?.email || "Unauthorized"
                }
            }
        },
        orderBy: {
            answer: "asc"
        }
    });

    return <Accordion type="single" collapsible className="w-full">
        {questions.map(q => (
            <AccordionItem key={q.id} value={q.id}>
                <AccordionTrigger className={cn(q.answer ? "text-primary" : "text-danger")}>{q.question}</AccordionTrigger>
                <AccordionContent>
                    {q.answer ? q.answer : <Answer id={q.id} />}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>;
};

export default Question;