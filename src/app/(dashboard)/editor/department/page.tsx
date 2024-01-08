import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/db";

import AddDpt from "../../_components/AddDpt";
import { Button } from "@/components/ui/button";
import { BsFillTrashFill } from "react-icons/bs";
import { redirect } from "next/navigation";


const page = async () => {
    const allDpt = await db.department.findMany({
        include: {
            branches: true,
        },
    });

    const onDelete = async (formData: FormData) => {
        "use server"
        const dptId = formData.get('deleteId') as string;
        try {
            await db.department.delete({
                where: {
                    id: dptId
                }
            })
            redirect("editor/department")
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong")
        }
    }


    return <div>
        <AddDpt />
        <Card>
            <CardHeader>
                <CardTitle>All Departments</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative overflow-hidden">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Department
                                </th>
                                <th scope="col" className="px-6 py-3 hidden md:block">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Branches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>

                            {allDpt.map((dpt) => (
                                <tr key={dpt.id} className=" border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {dpt.shortName}
                                    </th>
                                    <th scope="row" className=" hidden md:block px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {dpt.fullName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {dpt.branches.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        <form action={onDelete}>
                                            <input type="hidden" name="deleteId" value={dpt.id} />
                                            <Button type="submit" variant="ghost" color="danger" disabled={dpt.branches.length !== 0} ><BsFillTrashFill /></Button>
                                        </form>

                                    </td>
                                </tr>
                            ))}



                        </tbody>
                    </table>
                </div>



            </CardContent>
        </Card>
    </div>;
};

export default page;