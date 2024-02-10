import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddRepresentative from "../../_components/AddRepresentative";
import { Suspense } from "react";
import DeleteRepresentative from "../../_components/DeleteRepresentative";


const page = () => {
    return <Card>
        <CardHeader>
            <CardTitle>Add Representative</CardTitle>
        </CardHeader>
        <CardContent>
            <Suspense fallback="please wait.."><AddRepresentative /></Suspense>
            <Suspense fallback="please wait.."><DeleteRepresentative /></Suspense>
        </CardContent>
    </Card>
};

export default page;