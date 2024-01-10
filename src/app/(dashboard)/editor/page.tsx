
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditorSearch from "../_components/EditorSearch";
import { db } from "@/lib/db";
import UniversityList from "../_components/UniversityList";
import { FaUniversity } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import EditorShowCard from "../_components/EditorShowCard";
import { Suspense } from "react";
import EditorShowCardSK from "../_components/EditorShowCardSK";
const page = async ({ searchParams }: { searchParams: { search: string } }) => {
    const allUniversity = await db.university.findMany();
    const search = searchParams.search || "";
    ;
    const filteredSearch = allUniversity.filter((university) => {
        const hasMatchedName = university.university_name
            .toLowerCase()
            .includes(search.toLowerCase());
        ;
        return hasMatchedName;
    });
    return <div>
        <div className="container mx-auto mt-12">
            <Suspense fallback={<EditorShowCardSK />}>
                <EditorShowCard />
            </Suspense>
        </div>
        <div className="my-10 mx-auto">
            <Card>
                <CardHeader>
                    <EditorSearch search={search} />
                </CardHeader>
                <CardContent>
                    {filteredSearch.length > 0 ? (
                        filteredSearch.map((data) => (
                            <div key={data.id}>
                                <UniversityList data={data} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No University found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>

    </div >;
};

export default page;