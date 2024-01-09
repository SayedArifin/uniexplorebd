
import { redirect } from "next/navigation";
import Signout from "../_components/Signout";
import VerifiedBadge from "../_components/VarifiedBadge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/option";
import { db } from "@/lib/db";
import Image from "next/image";
import ProfileCard from "../_components/ProfileCard";
const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/")
    }
    let details;
    if (session) {
        details = await db.user.findFirst({
            where: { email: session?.user?.email as string }, include: {
                Bookmark: true,
                Article: true,
            },
        })
    }
    return <div className="flex flex-col md:flex-row gap-5 min-h-screen">
        <div className="w-full h-fit md:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-10">
                <Image width={150} height={150} className="w-24 h-24 mb-3 rounded-full shadow-lg" src={details?.image || ""} alt="Profile Picture" />
                <h5 className="mb-1 text-xl font-medium text-primary"><VerifiedBadge role={details?.role || "USER"} username={details?.name || ""} />
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{details?.email}</span>
                <div className="flex mt-4 md:mt-6 gap-4" >
                    <Signout />

                </div>
            </div>
        </div>
        <div className="w-full  mt-4 md:mt-0">
            <ProfileCard article={details?.Article} bookmark={details?.Bookmark} />
        </div>

    </div>;
};

export default page;