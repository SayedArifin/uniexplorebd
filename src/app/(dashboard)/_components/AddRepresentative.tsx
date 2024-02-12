"use client"

import { addRepresentative, fetchUniversity } from "@/action";
import { Button, Card, CardBody, Input, Select, SelectItem } from "@nextui-org/react";
import { University } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";



const AddRepresentative = () => {
    const [universities, setUniversities] = useState<University[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [loggedinEmail, setLoggedinEmail] = useState("")
    const [supportingEmail, setsupportingEmail] = useState("")
    const [universityId, setUniversityId] = useState("")
    const [university_logo, setUniversity_logo] = useState("")
    const { pending } = useFormStatus()
    const router = useRouter()
    useEffect(() => {
        const fetchUniversities = async () => {
            const res = await fetchUniversity();
            setUniversities(res)
            setIsLoading(false);
        }
        fetchUniversities();
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await addRepresentative(universityId, loggedinEmail, supportingEmail, university_logo)
            toast.success("Successfully added")
            setUniversityId("")
            setLoggedinEmail("")
            setsupportingEmail("")
            setUniversity_logo("")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
        }

    };

    return <Card className="mb-5">
        <CardBody >
            <form className="space-y-5" action={handleSubmit}>
                <Input variant="underlined" type="email" label="Enter  email address for login" isRequired value={loggedinEmail} onChange={e => setLoggedinEmail(e.target.value)} />
                <Input variant="underlined" type="email" label="Enter  email address for support" isRequired value={supportingEmail} onChange={e => setsupportingEmail(e.target.value)} />
                <Input variant="underlined" type="url" label="Enter University Logo Url" isRequired value={university_logo} onChange={e => setUniversity_logo(e.target.value)} />
                <Select
                    isLoading={isLoading}
                    isRequired
                    label="Select an University"
                    variant="underlined"
                    value={universityId}
                    onChange={e => setUniversityId(e.target.value)}
                >
                    {universities.map((university) => (
                        <SelectItem key={university.id} value={university.id}>
                            {university.university_name}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="submit" isDisabled={pending} isLoading={isLoading || pending} color="success" className="w-full">Add Representative</Button>
            </form>
        </CardBody>
    </Card>;
};

export default AddRepresentative;