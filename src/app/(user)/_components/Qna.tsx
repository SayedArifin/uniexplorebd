"use client"


import { createQuestion } from "@/action";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button, Textarea, } from "@nextui-org/react";
import { Representative, question } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { toast } from "sonner";

interface QnaProps {
    email?: string | null;
    question: question[]
    universityId: string
    name: string
    pic: string | null | undefined
    universityName: string
    representative: Representative
}

const Qna: React.FC<QnaProps> = ({ email, question, universityId, pic, name, universityName, representative }) => {
    const [q, setQ] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async () => {
        console.log("here")
        setIsLoading(true)

        if (email) {
            const res = await createQuestion(q, email, universityId)
            router.refresh()
            toast.success("Question submitted successfully")
            setIsLoading(false)

        } else {
            toast.error("you must be loggedin")
        }
    }
    return <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-1 justify-center items-center"><BsChatDotsFill /> Ask University</DropdownMenuTrigger>
        <DropdownMenuContent className="">
            <div className="max-w-sm">
                <div className="bg-gray-200 px-4 py-3 flex items-center justify-between border-b border-gray-300">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-800 text-lg font-semibold">{universityName}</span>
                    </div>
                </div>

                <div className="max-h-80 overflow-y-auto">
                    {question.map(q => (
                        <div key={q.id} className="flex my-5">
                            <div className="flex-shrink-0 mr-3">
                                <Image width={20} height={20} className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={pic || ""} alt="profile" />
                            </div>
                            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                <strong className="text-primary">{name}</strong>
                                <p className="text-xs">
                                    {q.question}
                                </p>
                                {q.answer && (<div className="space-y-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0 mr-3">
                                            <Image width={20} height={20} className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src={representative.university_logo} alt="university logo" />
                                        </div>
                                        <div className="flex-1 bg-gray-100 dark:bg-gray-600 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                            <strong className="text-primary">{representative.supportingEmail}</strong>
                                            <p className="text-xs">
                                                {q.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-lg mx-auto ">
                <div className=" rounded-lg overflow-hidden shadow-lg px-6 py-8">
                    <Textarea className="w-full mb-4" placeholder="Have a question? Ask directly to the university" variant="underlined" value={q} onChange={e => setQ(e.target.value)} />
                    <Button isLoading={isLoading} onClick={onSubmit} className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Ask Question</Button>
                </div>
            </div>

        </DropdownMenuContent>
    </DropdownMenu>
};

export default Qna;


