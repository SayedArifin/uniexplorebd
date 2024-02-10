import { RepresentativeSidebarItems } from "@/constant/sidebar";
import RepresentativeSidebar from "../../_component/RepresentativeSidebar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import AdShowCase from "../../_component/AdShowCase";


const page = () => {
    return <RepresentativeSidebar sidebarItems={RepresentativeSidebarItems}>
        <div className="space-y-5">
            <Card>
                <CardHeader>
                    <CardTitle>Want to promote your University?</CardTitle>
                    <CardDescription>Whatsapp:+8801572702411</CardDescription>
                    <CardDescription>Call our Helpline:+8801909232690</CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>All Entry</CardTitle>
                    <Suspense fallback="please wait.......">
                        <AdShowCase />
                    </Suspense>
                </CardHeader>
            </Card>

        </div>
    </RepresentativeSidebar>;
};

export default page;