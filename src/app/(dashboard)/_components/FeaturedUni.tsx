import FeaturedUniversity from "@/app/(user)/_components/FeaturedUniversity";
import { db } from "@/lib/db";

const FeaturedUni = async () => {
    const featuredUniversities = await db.featuredUniversity.findMany()

    return <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6">
        {featuredUniversities.map((university, index) => (
            <FeaturedUniversity
                key={index}
                data={university}
            />
        ))}
    </div>
};

export default FeaturedUni;