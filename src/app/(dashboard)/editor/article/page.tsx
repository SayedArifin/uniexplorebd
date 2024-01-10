import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditorArticle from "../../_components/EditorArticle";
import { Suspense } from "react";

const page = () => {
    return <Card>
        <CardHeader>
            <CardTitle>
                All Published Articles
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Suspense fallback={
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>

            }>
                <EditorArticle />
            </Suspense>
        </CardContent>
    </Card>;
};

export default page;