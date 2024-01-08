"use client"
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ModifyInputWLabel from "./ModifyInputWLabel"
import { fetchDpt, makeBatch } from "@/action";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
export function AddBranch({ id }: { id: string }) {
    const [selected, setSelected] = useState([]);
    const [dpts, setDpts] = useState<{
        id: string;
        shortName: string;
    }[]>();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [helpline, setHelpline] = useState("");
    const router = useRouter()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const dpts = await fetchDpt();

            setDpts(dpts);
        };
        fetch();
    }, []);
    const options = dpts?.map(item => ({
        label: item.shortName,
        value: item.id
    }));
    const data = {
        name, address, helpline, selected, id
    }
    const onSubmit = async () => {
        const res = await makeBatch(data)
        router.refresh()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Branch</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Add Branch</DialogTitle>
                    <DialogDescription>
                        Please ensure that all fields are filled in!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <form action={onSubmit} className="grid flex-1 gap-2">
                        <ModifyInputWLabel label={"Branch Name"} value={name} onchange={e => setName(e.target.value)} name={"name"} />
                        <ModifyInputWLabel label={"Physical Address"} onchange={e => setAddress(e.target.value)} name={"address"} />
                        <ModifyInputWLabel label={"helpline"} onchange={e => setHelpline(e.target.value)} name={"helpline"} />
                        <div className="flex flex-col justify-center items-center">
                            <h1>Available Departments</h1>

                            <MultiSelect
                                className="dark:text-gray-950 max-w-sm min-w-full  "
                                options={options || []}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                            />
                        </div>

                        <SubmitButton text="Add Branch" />
                    </form>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
