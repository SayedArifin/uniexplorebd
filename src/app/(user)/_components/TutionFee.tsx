"use client"

import { ModifyTutionFee } from "@/app/(dashboard)/_components/ModifyTutionFee"
import { TableCaption, TableHead, TableFooter } from "@/components/ui/table"
import { TableHeader, TableRow, TableBody, TableCell } from "@nextui-org/react"
import { Table } from "lucide-react"

interface TutionFeeProps {
}

const TutionFee: React.FC<TutionFeeProps> = () => {
    return <div className="flex mt-10 gap-2 justify-start items-center flex-wrap" >


        <Table>
            <TableCaption>Tution fee with available departments.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Department</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead >Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {branch.departments.map((dpt: any) => (
                    <TableRow key={dpt.id}>
                        <TableCell className="font-medium">{dpt.department.shortName}</TableCell>
                        <TableCell>{dpt.cost} BDT</TableCell>
                        <TableCell>{dpt.credit}</TableCell>
                        <TableCell><ModifyTutionFee id={dpt.id} cost={dpt.cost} credit={dpt.credit} dpt={dpt.department.shortName} /></TableCell>

                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>

            </TableFooter>
        </Table>
        <div />;
};

        export default TutionFee;