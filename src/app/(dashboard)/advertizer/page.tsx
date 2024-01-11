
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import FeaturedUni from "../_components/FeaturedUni";
import BannerAdvertizer from "../_components/BannerAdvertizer";


const page = () => {
    return <div className="flex flex-col gap-5">
        <Card>
            <CardHeader>
                <CardTitle>
                    Feature Universities
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense fallback={"Please wait..."}>
                    <FeaturedUni />
                </Suspense>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>
                    Carousel Banner
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense fallback={"Please wait..."}>
                    <BannerAdvertizer />
                </Suspense>
            </CardContent>
        </Card>
    </div>;
};

export default page;