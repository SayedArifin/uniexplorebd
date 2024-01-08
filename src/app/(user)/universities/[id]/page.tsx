import { BiMessageSquareX } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import ShowcaseLabel from "../../_components/ShowCaseLabel";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const university = await db.university.findUnique({
        where: {
            id
        },
        include: {
            branches: {
                include: {
                    departments: {

                        include: {
                            department: {

                                select: {

                                    shortName: true,


                                }
                            }
                        }
                    }
                }
            }
        }
    });
    const degreeMapping = {
        'BSC': 'Bachelor',
        'MSC': 'Masters',
    } as { [key: string]: string };
    console.log(university);
    return (
        <Card>
            <CardHeader >
                <CardTitle className="text-2xl font-extrabold  text-primary">
                    {university?.university_name}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Genaral Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ShowcaseLabel
                            text={"University Ranking"}
                            data={university?.rank}
                        />
                        <ShowcaseLabel
                            text={"Year of Establishment"}
                            data={university?.yearOfEstablishment}
                        />
                        <ShowcaseLabel
                            text={"Vice Chancellor Name"}
                            data={university?.viceChancellorName}
                        />
                        <ShowcaseLabel
                            text={"Registrar Name"}
                            data={university?.registrarName}
                        />
                        <ShowcaseLabel
                            text={"Official Website"}
                            data={
                                <Link
                                    className="text-primary flex flex-wrap underline"
                                    href={`${university?.officialWebsite}`}
                                    target="_blank"
                                >
                                    {university?.officialWebsite}
                                </Link>
                            }
                        />
                        <ShowcaseLabel text="Degrees" data={university?.availableDegrees.map(degree => (
                            <span className="mr-2" key={degree}>{degreeMapping[degree]}</span>
                        ))} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Contect Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ShowcaseLabel
                            text={"Email Address"}
                            data={university?.emailAddress}
                        />
                        <ShowcaseLabel
                            text={"Telephone / Mobile Number"}
                            data={university?.phoneNumber}
                        />
                        <ShowcaseLabel text={"Fax Number"} data={university?.faxNumber} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">branch Information</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {university?.branches.map((branch) => (
                            <Card className="p-2" key={branch.id}>
                                <ShowcaseLabel
                                    text={"Name"}
                                    data={branch.name}
                                />
                                <ShowcaseLabel
                                    text={"Address"}
                                    data={branch.address}
                                />
                                <ShowcaseLabel
                                    text={"Helpline"}
                                    data={branch.helpline}
                                />
                                <Card>
                                    <CardContent className="flex mt-10 gap-2 justify-start items-center flex-wrap">


                                        <Table>
                                            <TableCaption>Tution fee with available departments.</TableCaption>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead >Department</TableHead>
                                                    <TableHead>Total Cost</TableHead>
                                                    <TableHead>Credit</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {branch.departments.map((dpt: any) => (
                                                    <TableRow key={dpt.id}>
                                                        <TableCell className="font-medium">{dpt.department.shortName}</TableCell>
                                                        <TableCell>{dpt.cost} BDT</TableCell>
                                                        <TableCell>{dpt.credit}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            <TableFooter>

                                            </TableFooter>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">More Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                            <li className={cn("flex gap-1 items-center", university?.hasLab ? "text-green-700" : "text-red-700")}>
                                {university?.hasLab ? <MdOutlineVerified /> : <BiMessageSquareX />}
                                Lab Facilities Available
                            </li>
                            <li className={cn("flex gap-1 items-center", university?.hasPlayground ? "text-green-700" : "text-red-700")}>
                                {university?.hasPlayground ? <MdOutlineVerified /> : <BiMessageSquareX />}
                                Proper Playground Onsite
                            </li>
                            <li className={cn("flex gap-1 items-center", university?.hasElectricity ? "text-green-700" : "text-red-700")}>
                                {university?.hasElectricity ? <MdOutlineVerified /> : <BiMessageSquareX />}
                                Electricity Supply Available
                            </li>
                            <li className={cn("flex gap-1 items-center", university?.hasClub ? "text-green-700" : "text-red-700")}>
                                {university?.hasClub ? <MdOutlineVerified /> : <BiMessageSquareX />}
                                Club Facilities Offered
                            </li>
                        </ul>

                        <div className='prose bg-white rounded-md p-5 mt-5 min-w-full'>

                            <ReactMarkdown>{university?.moreInfo}</ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}

export default page
