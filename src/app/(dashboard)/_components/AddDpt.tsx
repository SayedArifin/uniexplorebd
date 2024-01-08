import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import InputWLabel from "./InputWLabel";
import SubmitButton from "@/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


const AddDpt = () => {
    const addDpt = async (formData: FormData) => {
        "use server"
        const shortName = formData.get("shortName") as string;
        const fullName = formData.get("fullName") as string;
        if (shortName || fullName) {
            try {
                await db.department.create({
                    data: {
                        shortName, fullName
                    }
                })
                revalidatePath("editor/department")
            } catch (error) {
                console.log(error);

            }
        }


    }
    return <>
        <Card>
            <CardHeader>
                <CardTitle>Add Department</CardTitle>
                <CardDescription>Please ensure that all fields are filled in and unique!</CardDescription>
                <Separator className="my-4" />
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-2 w-full" action={addDpt}>
                    <InputWLabel label="Short Name" name="shortName" placeholder="eg: CSE" />
                    <InputWLabel label="Full Name" name="fullName" placeholder="eg: Computer Science Engineering" />
                    <SubmitButton text="Add Department" />
                </form>
            </CardContent>

        </Card>
    </>
};

export default AddDpt;