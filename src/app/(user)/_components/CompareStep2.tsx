"use client"
import { CompareUniversity } from "@/action";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";


interface CompareStep2Props {
    choosedDp: string;
    selected: any
}

const CompareStep2: React.FC<CompareStep2Props> = ({ choosedDp, selected }) => {
    useEffect(() => {
        const Compare = async () => {
            const res = await CompareUniversity(selected, choosedDp);
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

        };
        Compare();
    }, [choosedDp, selected]);

    return <Dialog>
        <DialogTrigger asChild>
            <Button className="w-full mt-5" disabled={selected.length < 2}>Compare Now</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">

            {choosedDp}
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};

export default CompareStep2;

function async(arg0: () => void) {
    throw new Error("Function not implemented.");
}
