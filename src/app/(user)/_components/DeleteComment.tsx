"use client"
import { handleDelete } from "@/action";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface DeleteCommentProps {
    id: string
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ id }) => {
    const router = useRouter()
    const { pending } = useFormStatus()
    const handleDeletes = async () => {
        try {
            const res = await handleDelete(id);
            toast.success("Your Reviews have been deleted")
            router.refresh()
        } catch (error) {
            toast.error("Check your internet connection")
        }

    }
    return <button disabled={pending} onClick={handleDeletes} className="hover:underline hover:text-red-600"><Trash size={20} /></button>;
};

export default DeleteComment;