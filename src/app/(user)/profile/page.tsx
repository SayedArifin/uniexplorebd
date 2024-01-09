
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { redirect } from "next/navigation";
import Signout from "../_components/Signout";
import VerifiedBadge from "../_components/VarifiedBadge";
import { userDetail } from "@/action";


const page = async () => {
    const details = await userDetail()

    if (!details.details) {
        redirect("/")
    }
    return <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <div className="flex flex-col items-center py-10">
                <Image as={NextImage} width={150} height={150} className="w-24 h-24 mb-3 rounded-full shadow-lg" src={details.details?.image} alt="Profile Picture" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><VerifiedBadge role={details.details.role} username={details.details.name} />
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{details.details?.email}</span>
                <div className="flex mt-4 md:mt-6 gap-4" >
                    <Signout />

                </div>
            </div>
        </div>

    </div>;
};

export default page;