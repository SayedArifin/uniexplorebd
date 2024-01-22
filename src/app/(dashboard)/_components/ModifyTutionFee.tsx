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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";

export function ModifyTutionFee({ department, dpt }: any) {
    const [totalCost, setCost] = useState(department.cost);
    const [min_gpa, setMin_gpa] = useState(department.min_gpa);
    const [acceptance, setAcceptance] = useState(department.acceptance);
    const [internship_opportunities, setInternship_opportunities] = useState(department.internship_opportunities);
    const [research_facilities, setResearchFacilities] = useState(department.research_facilities);
    const [qualification, setQualification] = useState(department.qualification[0]);
    const [campus_size, setCampusSize] = useState(department.campus_size);
    const data = { cost: totalCost, min_gpa, acceptance, internship_opportunities, research_facilities, qualification: [qualification], campus_size };
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const Internship = ["AVAILABLE"
        , "LIMITED"
        , "OCCASIONAL"
        , "RARE"
        , "UNAVAILABLE"]
    const ResearchFacilities = [
        , "ADVANCED"
        , "WELL_MAINTAINED"
        , "SATISFACTORY"
        , "BELOW_AVERAGE"
        , "POOR"
    ]
    const Qualification =
        ["PHD",
            "MD",
            "JD",
            "ENGD",
            "DBA",
            "EDU",
            "MASTERS"]
    const CampusSize = [
        "LARGE",
        "MEDIUM",
        "SMALL"
    ]

    const handleModification = async () => {
        const res = await modifyDepartment(department.id, data);
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
                        <InputWLabel value={min_gpa} onchange={e => setMin_gpa(parseInt(e.target.value))} label={"Minimum GPA"} type="number" name={"gpa"} />
                        <InputWLabel value={acceptance} onchange={e => setAcceptance(parseInt(e.target.value))} label={"Acceptance"} type="number" name={"acceptance"} />
                        <Label>Internship Opportunities</Label>
                        <Select value={internship_opportunities} onValueChange={setInternship_opportunities}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Internship Opportunities" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Internship Opportunities</SelectLabel>
                                    {Internship.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Label>Research Facilities</Label>
                        <Select value={research_facilities} onValueChange={setResearchFacilities} >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Research Facilities" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>ResearchFacilities </SelectLabel>
                                    {ResearchFacilities.map((item) => (
                                        <SelectItem key={item} value={item || ""}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Label>Qualification</Label>

                        <Select value={qualification} onValueChange={setQualification}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Qualification" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Internship Qualification</SelectLabel>
                                    {Qualification.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Label>Campus Size</Label>
                        <Select value={campus_size} onValueChange={setCampusSize}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Campus Size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Internship Campus Size</SelectLabel>
                                    {CampusSize.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>


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
