"use client"

import { createAnswer } from "@/action";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AnswerProps {
    id: string;
}

const Answer: React.FC<AnswerProps> = ({ id }) => {
    const [answer, setAnswer] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async () => {
        setIsLoading(true)
        try {
            const res = await createAnswer(id, answer)
            router.refresh()
            toast.success("successfully created answer")

        } catch (error) {
            toast.error("something went wrong")
        }
    }

    return <div className="space-y-5">
        <Textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Type Replay here..." />
        <Button isLoading={isLoading} onClick={onSubmit} className="w-full">Replay</Button>
    </div>;
};

export default Answer;