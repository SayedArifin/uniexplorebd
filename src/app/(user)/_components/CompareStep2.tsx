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

import { Card, CardContent } from "@/components/ui/card";
import { CompareUniversity } from "@/action";
import Logo from '@/components/Logo';
import Extra from "./Extra";
import BookmarkCompare from './BookmarkCompare';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalProps, Button, useDisclosure } from "@nextui-org/react";
import { CampusSize, InternshipOpportunities, Qualification, ResearchFacilities } from '@prisma/client';
interface CompareStep2Props {
    choosedDp: string;
    selected: any;
}

const CompareStep2: React.FC<CompareStep2Props> = ({ choosedDp, selected }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");
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
    const fetchData = async () => {
        setData([]);
        const res = await CompareUniversity(choosedDp, selected);
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

    return (
        <div className="flex flex-wrap gap-3 w-full">
            <Button className='w-full bg-primary text-white mt-5' variant="solid" onClick={fetchData} onPress={onOpen} isDisabled={selected.length < 2}>Compare Now</Button>

            <Modal
                size="5xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior={scrollBehavior}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                                <Logo />
                                <p className='text-xs'>Compare University in a minute</p>
                            </ModalHeader>
                            <ModalBody>
                                <Card className=' '>

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
                            </ModalBody>
                            <ModalFooter>
                                <BookmarkCompare choosedDepartmentId={choosedDp} selectedUniversityId={selected.map((item: { value: string; }) => item.value)} />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CompareStep2;
