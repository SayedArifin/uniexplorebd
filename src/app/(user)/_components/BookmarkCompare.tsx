"use client"
import { CreateBookmark } from "@/action";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface BookmarkCompareProps {
    choosedDepartmentId: string;
    selectedUniversityId: string[]
}

const BookmarkCompare: React.FC<BookmarkCompareProps> = ({ selectedUniversityId, choosedDepartmentId }) => {
    const { status, data } = useSession();
    const [isSaved, setIsSaved] = useState(false);
    const [bookmark_title, setName] = useState("")
    const [userEmail, setUserEmail] = useState<string>(data?.user?.email || "")
    const handleBookmark = async () => {
        if (userEmail !== "") {
            const res = await CreateBookmark(bookmark_title, choosedDepartmentId, selectedUniversityId, userEmail)
            toast.success("Bookmark created successfully");
            setIsSaved(true)
        } else {
            toast.error("Check Your internet connection")
        }
    }
    return <div className="w-full">
        {status === "loading" && <p>Loading please wait...</p>}
        {status === "unauthenticated" && <p>To save this comparison as bookmark you must be <Button className="text-primary font-extrabold underline" onClick={() => signIn("google")}>Loggedin</Button></p>}
        {status === "authenticated" && <>
            {!isSaved && <form action={handleBookmark} className="flex flex-col gap-2 w-full justify-center items-center">
                <Input label="Enter Bookmark Name" value={bookmark_title} onChange={e => setName(e.target.value)} name="bookmark_name" variant="underlined" placeholder="type a name" isRequired /><SubmitButton text="Bookmark" />
            </form>}
            {isSaved && <p>You have bookmarked this</p>}

        </>}
    </div>;
};

export default BookmarkCompare;