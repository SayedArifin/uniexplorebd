"use client"

import { ReviewUniversity } from "@/action";
import { Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
interface UniversityCommentProps {
    universityId: string;
    userEmail: string | null | undefined;


}

const UniversityComment: React.FC<UniversityCommentProps> = ({ userEmail, universityId }) => {
    const [selected, setSelected] = useState<any>("RECOMMENDED");
    const [comment, setComment] = useState("");
    const router = useRouter()
    const { pending } = useFormStatus();
    const handleSubmit = async () => {
        if (comment === "") {
            toast.error("Please enter a comment");
            return
        }
        try {
            const res = await ReviewUniversity(userEmail || "", universityId, selected, comment)
            setComment("")
            setSelected("RECOMMENDED")
            toast.success("Thanks for your review")
            router.refresh()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    return <div className="w-full p-4">
        {userEmail === undefined && <p>You have to <Link className="text-primary hover:underline" onClick={e => signIn("google")} href={"#"}>login</Link> to review</p>}
        {userEmail !== undefined && <>
            <div id="comment" className="mb-2">
                <RadioGroup
                    value={selected}
                    label="What is your view"
                    orientation="horizontal"
                    onValueChange={setSelected}
                >
                    <Radio value="RECOMMENDED">RECOMMENDED</Radio>
                    <Radio value="NOT_RECOMMENDED">NOT RECOMMENDED</Radio>
                </RadioGroup>
                <label htmlFor="comment" className="text-lg text-gray-600">Write a review</label>

                <Textarea
                    variant="underlined"
                    isRequired
                    name="comment"
                    placeholder="write your thought..."
                    value={comment}
                    onValueChange={setComment}
                ></Textarea>
            </div>
            <div className="flex gap-5">
                <button disabled={pending} onClick={handleSubmit} className="px-3 py-2 text-sm text-primary-100 bg-primary-600 rounded">
                    Comment
                </button>
                <button
                    onClick={e => setComment("")}
                    className="px-3 py-2 text-sm text-primary-600 border border-primary-500 rounded">
                    Cancel
                </button>
            </div></>}
    </div>;
};

export default UniversityComment;