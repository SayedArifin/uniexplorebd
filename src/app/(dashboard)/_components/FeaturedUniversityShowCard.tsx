import { Card, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import NextImage from "next/image";
import { FeaturedUniversity } from "@prisma/client";
import FeaturedUniversityEditModal from "./FeaturedUniversityEditModal";
import { Suspense } from "react";
interface featuredUniversityShowCardProps {
    data: FeaturedUniversity
}

const FeaturedUniversityShowCard: React.FC<featuredUniversityShowCardProps> = ({ data }) => {
    return <Card shadow="md">
        <CardBody className="overflow-visible p-0">
            <Image
                as={NextImage}
                shadow="sm"
                radius="lg"
                width="150"
                height="150"
                alt={data.university_name}
                className="w-full object-cover h-[140px] invert dark:invert-0"
                src={data.image_url}
            />
        </CardBody>
        <CardFooter className="text-small justify-between">
            <b className="overflow-hidden">{data.university_name}</b>
            <Suspense fallback={<>please wait</>}>
                <FeaturedUniversityEditModal data={data} />
            </Suspense>
        </CardFooter>
    </Card>

};

export default FeaturedUniversityShowCard;