import { BiChat, BiMessageSquareX } from "react-icons/bi";
import { MdOutlineVerified, MdVerified } from "react-icons/md";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import ShowcaseLabel from "./ShowCaseLabel";
import Image from "next/image";
import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import UniversityComment from "./UniversityComment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/option";
import VerifiedBadge from "./VarifiedBadge";
import { MessageCircleQuestionIcon, Trash2 } from "lucide-react";
import DeleteComment from "./DeleteComment";
import { BsQuestionOctagonFill } from "react-icons/bs";
const UniversityDetails = async ({ id }: { id: string }) => {
    const session = await getServerSession(authOptions);

    const university = await db.university.findUnique({
        where: {
            id
        },
        include: {
            Representative: true,
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
            }, Reviews: {
                include: {
                    user: true
                }, orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });
    const degreeMapping = {
        'BSC': 'Bachelor',
        'MSC': 'Masters',
    } as { [key: string]: string };

    return (
        <Card>
            <CardHeader >
                <CardTitle className="text-2xl font-extrabold  text-primary flex items-center gap-2">
                    {university?.university_name}{university?.Representative && <MdVerified />}
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

                                <Table>
                                    <TableCaption>Tution fee with available departments.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead scope="col">Name</TableHead>
                                            <TableHead scope="col">Tuition Fee</TableHead>
                                            <TableHead scope="col">Minimum GPA <span className='text-xs '>(HSC+SSC)</span> </TableHead>
                                            <TableHead scope="col">Acceptance</TableHead>
                                            <TableHead scope="col">Internship Opportunities</TableHead>
                                            <TableHead scope="col">Head&apos;s Qualification</TableHead>
                                            <TableHead scope="col">Campus Size</TableHead>
                                            <TableHead scope="col">Research Facilities</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {branch.departments.map((dpt: any) => (
                                            <TableRow key={dpt.id}>
                                                <TableCell className="font-medium">{dpt.department.shortName}</TableCell>
                                                <TableCell>{dpt.cost} BDT</TableCell>
                                                <TableCell>{dpt.min_gpa}</TableCell>
                                                <TableCell>
                                                    {dpt.acceptance}%
                                                </TableCell><TableCell>
                                                    {dpt.internship_opportunities}
                                                </TableCell><TableCell>
                                                    {dpt.qualification.map((q: any) => (
                                                        <p className="mr-1" key={q}>{q}</p>
                                                    ))}
                                                </TableCell><TableCell>
                                                    {dpt.campus_size}
                                                </TableCell>
                                                <TableCell>
                                                    {dpt.research_facilities}
                                                </TableCell>


                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>

                                    </TableFooter>
                                </Table>

                            </Card>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">More Information</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className='prose bg-white rounded-md p-5 mt-5 min-w-full'>
                            <ReactMarkdown>{university?.moreInfo}</ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Public Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 md:p-2">
                        <div className="flex flex-col justify-center relative top-1/3">

                            <UniversityComment userEmail={session?.user?.email} universityId={id} />

                            <div className="">
                                <CardHeader>
                                    <CardDescription>see what other people think</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {university?.Reviews.length === 0 && <p>Dont Have any review yet </p>}
                                    {university?.Reviews.map(review => (
                                        <div key={review.id} className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg  shadow-lg dark:shadow-white">
                                            <div className="relative flex gap-4">
                                                <Image src={review.user.image} className="relative rounded-lg -top-8 -mb-4 bg-white border h-10 w-10 md:h-20 md:w-20" alt="" loading="lazy" width={100} height={100} />
                                                <div className="flex flex-col w-full">
                                                    <div className="flex flex-row justify-between">
                                                        <div className="relative text-sm md:text-xl whitespace-nowrap truncate overflow-hidden"><VerifiedBadge role={review.user.role || "USER"} username={review.user.name || ""} /></div>
                                                        {session?.user?.email === review.userEmail && <DeleteComment id={review.id} />}
                                                    </div>
                                                    <p className={cn(" text-xs md:text-sm", review.recommendation === "RECOMMENDED" ? "text-green-600" : "text-red-600")}>{review.recommendation === "RECOMMENDED" ? "Recommended this university" : "Didnt Recomended this university"}</p>
                                                </div>
                                            </div>
                                            <p className="-mt-4 text-gray-500">{review.comment}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="fixed bottom-4 right-4">
                    <Button className="flex justify-center items-center gap-2">
                        <MessageCircleQuestionIcon /> Ask University
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default UniversityDetails;
