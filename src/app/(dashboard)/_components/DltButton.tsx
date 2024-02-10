"use client"

import { deleteRepresentation } from "@/action";
import { Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface DltButtonProps {
    id: string
}

const DltButton: React.FC<DltButtonProps> = ({ id }) => {
    const { pending } = useFormStatus()
    const router = useRouter()
    const handleDelete = async () => {
        try {
            await deleteRepresentation(id)
            toast.success("deleted successfully")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return <form action={handleDelete}>
        <Button type={"submit"} isLoading={pending} isIconOnly><Trash2 /></Button>
    </form>;
};

export default DltButton;