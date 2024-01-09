"use client";

import { allDept, universitiesWithDepartmentId } from "@/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "sonner";
import CompareStep2 from "./CompareStep2";

const CompareStep1 = () => {
    const [allDpts, setAllDpts] = useState<{ value: string; label: string }[]>([]);
    const [choosedDpt, setChoosedDpt] = useState<string>("");
    const [choosedUniversity, setChoosedUniversity] = useState<{
        value: string;
        label: string;
    }[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const fetchAllDpt = async () => {
            try {
                const dpt = await allDept();
                const convertedDpt = dpt.map((item) => ({
                    value: item.id,
                    label: item.shortName,
                }));
                setAllDpts(convertedDpt);
                setIsLoading(false);
            } catch (error: any) {
                toast.error("Error fetching departments:", error);

            }
        };

        fetchAllDpt();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setSelected([])
            const fetchUniversities = async () => {
                try {
                    const res = await universitiesWithDepartmentId(choosedDpt);
                    const universities = res?.map((item) => ({
                        label: item.university_name,
                        value: item.id,
                    }));
                    setChoosedUniversity(universities);
                    setIsLoading2(false);
                } catch (error: any) {
                    toast.error("Error fetching universities:", error);

                }
            };

            fetchUniversities();
        }
    }, [choosedDpt, isLoading]);

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>
                    <h1 className="font-extrabold text-lg">Step 1: Choose a Department You Want to Study</h1>
                </CardHeader>
                <CardContent>
                    <p>{isLoading ? "Please wait, fetching departments..." : "Select a department from the list below."}</p>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                        <Select
                            isLoading={isLoading}
                            variant="underlined"
                            disabled={isLoading}
                            label="Department"
                            placeholder="Select a Department"
                            className="max-w-xs"
                            onChange={(e) => setChoosedDpt(e.target.value)}
                        >
                            {allDpts.map((dpt) => (
                                <SelectItem key={dpt.value} value={dpt.value}>
                                    {dpt.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <h1 className="font-extrabold text-lg">Step 2: Choose Universities to Compare</h1>
                </CardHeader>
                <CardContent>
                    <p>
                        {choosedDpt === ""
                            ? "Please select a department before proceeding."
                            : "Select at least two universities to compare."}
                    </p>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                        <MultiSelect
                            disabled={choosedDpt === ""}
                            className="dark:text-gray-950 max-w-sm min-w-full  "
                            options={choosedUniversity || []}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex flex-col justify-center items-center ">
                    <CompareStep2 choosedDp={choosedDpt} selected={selected} />

                    <p className="text-red-600">{selected.length > 1
                        ? ""
                        : "Please select at least two universities to proceed with the comparison."}</p>
                </CardContent>
            </Card>

        </div>
    );
};

export default CompareStep1;
