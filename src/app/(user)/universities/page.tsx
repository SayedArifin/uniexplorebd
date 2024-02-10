
import { db } from "@/lib/db";
import UniversitySearch from "../_components/UniversitySearch";
import ShowCaseCard from "../_components/ShowCaseCard";
import { Suspense } from "react";
import { BannerCarousel } from "../_components/Carousel";
export const metadata = {
    title: "Search University",
    description:
        "EduConnect360 is the ultimate destination for students seeking the perfect university match. Our platform is designed exclusively to streamline the university search process, making it easier than ever for students to find their ideal educational institution",
};
const Page = async ({ searchParams }: { searchParams: { search: string, depertment: string } }) => {
    const universities = await db.university.findMany({
        select: {
            id: true, university_name: true, rank: true, availableDegrees: true, hasRepresentative: true,
        }, orderBy: {
            rank: 'asc',
        },
    });
    const carousels = await db.carousel.findMany()
    const search = searchParams.search || "";
    const filteredSearch = universities.filter((university) => {
        const hasMatchedName = university.university_name
            .toLowerCase()
            .includes(search.toLowerCase());
        return hasMatchedName;
    });

    return (
        <div className="main min-h-screen  ">
            <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                <div className="hero">
                    <div className="flex justify-center items-center">
                        <BannerCarousel carousels={carousels} />
                    </div>
                    <div className="hero-headline flex flex-col items-center justify-center  text-center tracking-in-expand">
                        <h1 className="font-bold text-3xl text-primary">
                            Find Your Dream University Without Any Hassle
                        </h1>
                        <p className="font-base text-base text-secondary-white">
                            Scrole , Search or Filter According to Your Need
                        </p>
                    </div>
                    <Suspense fallback={<p>loading</p>}><UniversitySearch search={search} /></Suspense>
                    <section className="my-10 py-5 grid grid-cols-1 gap-5 md:grid-cols-1  bg-gray-200 dark:bg-gray-700 swing-in-top-fwd">
                        {filteredSearch.length > 0 ? (
                            filteredSearch.map((data) => (
                                <div key={data.id}>
                                    <ShowCaseCard university={data} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center ">
                                <p>No University found matching your criteria.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Page;