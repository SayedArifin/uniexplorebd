import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import EditorShowCard from "../_components/EditorShowCard"
import EditorShowCardSK from "../_components/EditorShowCardSK"
import BarChart from "../_components/Bar"
import Link from "next/link"

const page = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Owner Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<EditorShowCardSK />}>
                        <EditorShowCard />
                    </Suspense>
                    <div className="flex gap-2 my-5 flex-col md:flex-row">
                        <Card className="w-full">
                            <CardHeader className="flex md:flex-row flex-col justify-between">
                                <CardTitle>
                                    Popular Department
                                </CardTitle>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-600 mr-2 rounded-full"></div>
                                    <div className="text-sm ">Branch Count</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <BarChart />
                            </CardContent>
                        </Card>
                        <Card className="md:w-1/4 w-full ">
                            <CardHeader>
                                <CardTitle>
                                    Usefull Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    <CardDescription>Dashboard</CardDescription>
                                    <li><Link target="_blank" className="hover:underline" href={"/editor"}>Editor</Link></li>
                                    <li><Link target="_blank" className="hover:underline" href={"/advertizer"}>Advertizer</Link></li>
                                    <CardDescription>User Panel</CardDescription>
                                    <li><Link target="_blank" className="hover:underline" href={"/universities"}>Find University</Link></li>
                                    <li><Link target="_blank" className="hover:underline" href={"/compare"}>Compare</Link></li>
                                    <li><Link target="_blank" className="hover:underline" href={"/"}>Home</Link></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}

export default page
