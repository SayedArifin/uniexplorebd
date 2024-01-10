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
import BookmarkCompare from './BookmarkCompare';

interface CompareStep2Props {
    choosedDp: string;
    selected: any;
}
// ... (imports remain unchanged)

const CompareStep2: React.FC<CompareStep2Props> = ({ choosedDp, selected }) => {
    const [data, setData] = useState<{
        university_name: string;
        department_shortName: string;
        branch_name: string;
        cost: number;
        credit: number;
        hasClub: boolean;
        hasLab: boolean;
        hasPlayground: boolean;
        hasElectricity: boolean;
    }[]>([]);

    const [uniqueUniversities, setUniqueUniversities] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        const fetchData = async () => {

            const res = await CompareUniversityShow(choosedDp, selected);
            const filteredData = res.flatMap((university) =>
                university.branches.flatMap((branch) =>
                    branch.departments.map((department) => ({
                        university_name: university.university_name,
                        department_shortName: department.department.shortName,
                        branch_name: branch.name,
                        cost: department.cost,
                        credit: department.credit,
                        hasClub: university.hasClub,
                        hasLab: university.hasLab,
                        hasPlayground: university.hasPlayground,
                        hasElectricity: university.hasElectricity,
                    }))
                )
            );

            setData(filteredData);
        };

        fetchData();

        const updatedUniqueUniversities: { [key: string]: any } = {};
        data?.forEach(entry => {
            const key = entry.university_name + entry.department_shortName;
            if (!updatedUniqueUniversities[key]) {
                updatedUniqueUniversities[key] = { ...entry };
            } else {
                updatedUniqueUniversities[key].branch_name += `, ${entry.branch_name}`;
            }
        });
        setUniqueUniversities(updatedUniqueUniversities);
    }, [data, choosedDp, selected]);

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
                                    <TableHead scope="col">University Name</TableHead>
                                    <TableHead scope="col">Branch</TableHead>
                                    <TableHead scope="col">Total Cost</TableHead>
                                    <TableHead scope="col">Credit</TableHead>
                                    <TableHead scope="col">Infrastructure at a Glance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.values(uniqueUniversities).map((entry, index) => (
                                    <TableRow key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <TableCell>{entry.university_name}</TableCell>
                                        <TableCell>{entry.branch_name}</TableCell>
                                        <TableCell>{entry.cost} BDT</TableCell>
                                        <TableCell>{entry.credit}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Extra has={entry.hasLab} label={"Lab"} />
                                                <Extra has={entry.hasClub} label={"Club"} />
                                                <Extra has={entry.hasPlayground} label={"Playground"} />
                                                <Extra has={entry.hasElectricity} label={"Electricity"} />
                                            </div>
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
