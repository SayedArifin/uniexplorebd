import Link from "next/link";
import { FaUniversity } from "react-icons/fa";
import { University } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
const UniversityList = ({ data }: { data: University }) => {
    const deleteUniversity = async (formData: FormData) => {
        "use server"
        const id = formData.get('id') as string;
        await db.university.delete({
            where: { id }
        });
        revalidatePath("editor")
    }
    return (
        <div className="py-3 sm:pb-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md px-5">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-black dark:text-white">
                    <FaUniversity />
                </div>
                <Link href={`editor/${data.id}`} className="flex-1 min-w-0">
                    <p className="text-sm font-medium  truncate ">
                        {data.university_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Rank: {data.rank}
                    </p>
                </Link>
                <div className="inline-flex items-center font-semibold p-5 z-20">
                    <form action={deleteUniversity} className="flex gap-5">
                        <input type="hidden" value={data.id} name={"id"} />
                        <Button variant={"outline"} type="submit"><Trash2 /></Button>
                    </form>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default UniversityList;