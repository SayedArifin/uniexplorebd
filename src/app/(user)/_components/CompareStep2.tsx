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
        credit: number;
        hasClub: boolean;
        hasLab: boolean;
        hasPlayground: boolean;
        hasElectricity: boolean;
    }[]>([]);

    const [uniqueUniversities, setUniqueUniversities] = useState<{ [key: string]: any }>({});

    const fetchData = async () => {
        setData([])
        const res = await CompareUniversity(choosedDp, selected);
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





    useEffect(() => {
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
    }, [data]);

    return (
        <div className="flex flex-wrap gap-3 w-full">
            <Button className='w-full bg-primary text-white mt-5' variant="solid" onClick={fetchData} onPress={onOpen} isDisabled={selected.length < 2}>Compare Now</Button>

            <Modal
                size='5xl'
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
