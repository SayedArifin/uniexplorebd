
import { FeaturedUniversity } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
interface FeaturedUniversityProps {
    data: FeaturedUniversity;
}

const FeaturedUniversity: React.FC<FeaturedUniversityProps> = ({ data }) => {

    return <Link
        href={data.href || ""}
        className="flex items-center lg:justify-center hover:scale-110 transition-transform"
    >
        <Image
            priority
            width={200}
            height={200}
            src={data.image_url}
            alt={data.university_name}
            className="swing-in-top-fwd invert dark:invert-0"
        />
    </Link>;
};

export default FeaturedUniversity;