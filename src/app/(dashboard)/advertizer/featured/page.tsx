import { db } from "@/lib/db";
import { Suspense } from "react";
import FeaturedUniversityAddModal from "../../_components/FeaturedUniversityAdd";
import FeaturedUniversityShowCard from "../../_components/FeaturedUniversityShowCard";

const page = async () => {
    const featuredUniversity = await db.featuredUniversity.findMany()
    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modify Featured University</h1>
            <div className="my-5">
                {featuredUniversity.length < 6 && <FeaturedUniversityAddModal />}
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {featuredUniversity.map((university) => (
                    <Suspense key={university.id} fallback={<p>please wait</p>}><FeaturedUniversityShowCard key={university.id} data={university} /></Suspense>
                ))}
            </div>
        </>
    );
};

export default page;