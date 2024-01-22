"use client"
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,

    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,

} from "@/components/ui/card";

import { CompareUniversityShow } from "@/action";
import Logo from '@/components/Logo';
import Extra from "./Extra";
import { CampusSize, InternshipOpportunities, Qualification, ResearchFacilities } from '@prisma/client';
interface CompareStep2Props {
    choosedDp: string;
    selected: any;
}
const CompareStep2: React.FC<CompareStep2Props> = ({ choosedDp, selected }) => {
    const [data, setData] = useState<{
        university_name: string;
        department_shortName: string;
        branch_name: string;
        cost: number;
        gpa: number;
        acceptance: number;
        internship_opportunities: InternshipOpportunities;
        qualification: Qualification;
        campus_size: CampusSize;
        research_facilities: ResearchFacilities;

    }[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            setData([]);
            const res = await CompareUniversityShow(choosedDp, selected);
            const uniqueUniversityDataMap: { [key: string]: typeof data[0] } = {};

            res.forEach((university) => {
                university.branches.forEach((branch) => {
                    branch.departments.forEach((department) => {
                        const universityKey = university.university_name;
                        if (!uniqueUniversityDataMap[universityKey]) {
                            uniqueUniversityDataMap[universityKey] = {
                                university_name: university.university_name,
                                department_shortName: department.department.shortName,
                                branch_name: branch.name,
                                cost: department.cost,
                                gpa: department.min_gpa,
                                acceptance: department.acceptance,
                                internship_opportunities: department.internship_opportunities,
                                qualification: department.qualification[0],
                                campus_size: department.campus_size,
                                research_facilities: department.research_facilities
                            };
                        }
                    });
                });
            });

            const uniqueUniversityData = Object.values(uniqueUniversityDataMap);
            setData(uniqueUniversityData);
        };
        fetchData()
    }, [choosedDp, selected]);

    return (
        <Card className="md:min-w-fit">
            <CardHeader className='flex flex-col justify-center items-center'>
                <CardTitle><Logo /></CardTitle>
                <CardDescription>Compare University in a minute</CardDescription>
            </CardHeader>
            <Card className='overflow-scroll md:overflow-x-hidden'>
                <CardContent>
                    <div className="">
                        <Table className=''>
                            <TableCaption>Comparing Based on {data[0]?.department_shortName}</TableCaption>
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
                                {data.map((entry, index) => (
                                    <TableRow key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <TableCell>{entry.university_name}</TableCell>
                                        <TableCell>{entry.cost} BDT</TableCell>
                                        <TableCell>{entry.gpa}</TableCell>
                                        <TableCell>
                                            {entry.acceptance}
                                        </TableCell><TableCell>
                                            {entry.internship_opportunities}
                                        </TableCell><TableCell>
                                            {entry.qualification}
                                        </TableCell><TableCell>
                                            {entry.campus_size}
                                        </TableCell>
                                        <TableCell>
                                            {entry.research_facilities}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </Card>
    );
};

export default CompareStep2;
