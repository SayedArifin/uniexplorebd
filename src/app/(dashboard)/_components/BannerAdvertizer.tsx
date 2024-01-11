import { BannerCarousel } from "@/app/(user)/_components/Carousel";
import { db } from "@/lib/db";


const BannerAdvertizer = async () => {
    const carousels = await db.carousel.findMany()
    return <div className="flex justify-center items-center">
        <BannerCarousel carousels={carousels} />
    </div>;
};

export default BannerAdvertizer;