import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,

} from "@/components/ui/drawer";
import { Edit } from "lucide-react";
import { useState } from "react";
import InputWLabel from "./ModifyInputWLabel";
import { modifyDepartment } from "@/action";
import { useRouter } from "next/navigation";

export function ModifyTutionFee({ id, credit, cost, dpt }: { id: string, credit: number, cost: number, dpt: string }) {
    const [totalCost, setCost] = useState(cost);
    const [minCredit, setCredit] = useState(credit);
    const data = { cost: totalCost, credit: minCredit };
    const router = useRouter();
    const [open, setOpen] = useState(false)

    const handleModification = async () => {
        const res = await modifyDepartment(id, data);
        router.refresh();
        setOpen(false);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline"><Edit /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Department of {dpt}</DrawerTitle>
                        <DrawerDescription>All the fields are required.</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2">
                        <InputWLabel value={totalCost} onchange={e => setCost(parseInt(e.target.value))} label={"Total Cost"} type="number" name={"cost"} />
                        <InputWLabel value={minCredit} onchange={e => setCredit(parseInt(e.target.value))} label={"Minimum Credit"} type="number" name={"credit"} />
                    </div>

                    <DrawerFooter>
                        <Button onClick={handleModification}>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
