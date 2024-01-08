import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompareStep1 from "../_components/CompareStep1";
import { Suspense } from "react";


interface pageProps {
}

const page: React.FC<pageProps> = () => {
    return <Card>
        <CardHeader>
            <CardTitle className="text-primary">
                Compare And ShortList Universities in a Minute !
            </CardTitle>
            <CardContent>
                <Suspense fallback={<p>loading</p>}>
                    <CompareStep1 />
                </Suspense>
            </CardContent>
        </CardHeader>
    </Card>;
};

export default page;