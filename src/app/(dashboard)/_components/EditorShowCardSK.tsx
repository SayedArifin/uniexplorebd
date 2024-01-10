import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUniversity } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
const EditorShowCardSK = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        University Listed
                    </CardTitle>
                    <FaUniversity />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        by Editor
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total User
                    </CardTitle>
                    <RiUser3Line />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        registered on uniExplore
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Department Added</CardTitle>
                    <MdOutlineLocalFireDepartment />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        till now
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Article Published</CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        by our user
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditorShowCardSK
