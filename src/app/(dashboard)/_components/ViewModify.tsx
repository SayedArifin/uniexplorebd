"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ModifyInputWLabel from "./ModifyInputWLabel";
import { University } from "@prisma/client";
import RadioBool from "@/components/ui/Radio";
import MarkdownEditor from "./Markdown";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { deleteBranch, undateUniversity } from "@/action";
import { AddBranch } from "./AddBranch";
import { Label } from "@/components/ui/label";
import { Edit2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ModifyTutionFee } from "./ModifyTutionFee";
interface ViewModifyProps {
    university: University | any;
}

const ViewModify: React.FC<ViewModifyProps> = ({ university }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [rank, setRank] = useState(parseInt(university?.rank, 10) || 0);
    const [yearOfEstablishment, setYearOfEstablishment] = useState(university?.yearOfEstablishment);
    const [viceChancellorName, setViceChancellorName] = useState(university?.viceChancellorName);
    const [registrarName, setRegistrarName] = useState(university?.registrarName);
    const [officialWebsite, setOfficialWebsite] = useState(university?.officialWebsite);
    const [emailAddress, setEmailAddress] = useState(university?.emailAddress);
    const [phoneNumber, setPhoneNumber] = useState(university?.phoneNumber);
    const [faxNumber, setFaxNumber] = useState(university?.faxNumber);
    const [moreInfo, setMoreInfo] = useState(university?.moreInfo);
    const [availableDegrees, setAvailableDegrees] = useState(university?.availableDegrees || []);

    const router = useRouter()
    const handleCheckboxChange = (degree: string) => {
        setAvailableDegrees((prevDegrees: string[]) => {
            if (prevDegrees.includes(degree)) {
                return prevDegrees.filter((d: string) => d !== degree);
            } else {
                return [...prevDegrees, degree];
            }
        });
    };
    const handleDeleteBranch = async (id: string) => {
        const res = await deleteBranch(id)
        router.refresh();
    }

    const handleSubmit = async () => {

        const data = {
            rank,
            yearOfEstablishment,
            viceChancellorName,
            registrarName,
            officialWebsite,
            availableDegrees,
            emailAddress,
            phoneNumber,
            faxNumber,
            moreInfo,
        } as University;

        try {
            const res = await undateUniversity(university.id, data);
            router.refresh();
            setIsEditing(false);
        } catch (error) {
            console.log(error)
        }
    };

    return (<>
        <div className="w-full flex flex-col gap-2 mb-2 ">
            <Button onClick={() => setIsEditing(!isEditing)} variant={"destructive"}>{isEditing ? "cancel" : "Edit"}</Button>
            {!isEditing && <AddBranch id={university.id} />}
        </div>
        <form action={handleSubmit} className="flex flex-col gap-3">

            <Card>
                <CardHeader>
                    <h1 className="font-bold">
                        Basic Information
                    </h1>
                </CardHeader>
                <CardContent>
                    <ModifyInputWLabel onchange={e => setRank(parseInt(e.target.value, 10))} disabled={!isEditing} label="Ranking in Bangladesh" value={rank} type="number" name="rank" />
                    <ModifyInputWLabel onchange={e => setYearOfEstablishment(e.target.value)} disabled={!isEditing} label="Year of Establishment" value={yearOfEstablishment} type="number" name="yearOfEstablishment" />
                    <ModifyInputWLabel onchange={e => setViceChancellorName(e.target.value)} disabled={!isEditing} label="Vice Chancellor Name" value={viceChancellorName} name="viceChancellorName" />
                    <ModifyInputWLabel onchange={e => setRegistrarName(e.target.value)} disabled={!isEditing} label="Registrar Name" value={registrarName} name="registrarName" />
                    <ModifyInputWLabel onchange={e => setOfficialWebsite(e.target.value)} disabled={!isEditing} label="Website" value={officialWebsite} type="url" name="officialWebsite" />
                    <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Offered Degree:</h4>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {['BSC', 'MSC'].map((degree) => (
                            <li key={degree} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input
                                        id={degree.toLowerCase()}
                                        type="checkbox"
                                        value={degree}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        name={degree}
                                        defaultChecked={availableDegrees.includes(degree)}
                                        disabled={!isEditing}
                                        onChange={() => handleCheckboxChange(degree)}
                                    />
                                    <label
                                        htmlFor={degree.toLowerCase()}
                                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {degree === 'BSC' ? 'Bachelors' : 'Masters'}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <h1 className="font-bold">
                        Contact Information
                    </h1>
                </CardHeader>
                <CardContent>
                    <ModifyInputWLabel onchange={e => setEmailAddress(e.target.value)} disabled={!isEditing} label="Email Address" value={emailAddress} type="email" name="emailAddress" />
                    <ModifyInputWLabel onchange={e => setPhoneNumber(e.target.value)} disabled={!isEditing} label="Telephone / Mobile Number" value={phoneNumber} name="phoneNumber" />
                    <ModifyInputWLabel onchange={e => setFaxNumber(e.target.value)} disabled={!isEditing} label="Fax Number" value={faxNumber} name="faxNumber" />
                </CardContent>
            </Card>
            {!isEditing && <Card>
                <CardHeader>
                    <h1 className="font-bold">
                        Branch Information
                    </h1>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    {university.branches.map((branch: any, index: number) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex justify-between">
                                    <h1 className="font-bold">
                                        {branch.name}
                                    </h1>
                                    <div className="flex">
                                        <Button onClick={() => handleDeleteBranch(branch.id)} size={"sm"} variant={"link"}><Trash /></Button>
                                        <Button size={"sm"} variant={"link"}><Edit2 /></Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="">
                                    <Label>Physical Address: </Label>
                                    {branch.address}
                                </div>
                                <div className="">
                                    <Label>Helpline: </Label>
                                    {branch.helpline}
                                </div>
                                <div className="flex mt-10 gap-2 justify-start items-center flex-wrap">


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
                                                    <TableCell><ModifyTutionFee department={dpt} dpt={dpt.department.shortName} /></TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>

                                        </TableFooter>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                </CardContent>
            </Card>}

            <Card>
                <CardHeader>
                    <CardTitle className="font-bold text-4xl">
                        Additional Information:
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <MarkdownEditor onchange={e => setMoreInfo(e.target.value)} disabled={!isEditing} moreInfo={moreInfo} />
                </CardContent>
            </Card>
            {isEditing && <SubmitButton text="Modify University" />}
        </form></>

    );
};

export default ViewModify;
