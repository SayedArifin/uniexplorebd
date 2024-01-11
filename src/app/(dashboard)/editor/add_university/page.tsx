
import SubmitButton from "@/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InputWLabel from "../../_components/InputWLabel";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import RadioBool from "@/components/ui/Radio";
import MarkdownEditor from "../../_components/Markdown";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


const page = () => {
    const addUniversity = async (formData: FormData) => {
        "use server"
        const university_name = formData.get("university_name") as string;
        const rank = parseInt(formData.get("rank") as string, 10);
        const yearOfEstablishment = parseInt(formData.get("yearOfEstablishment") as string, 10);
        const viceChancellorName = formData.get("viceChancellorName") as string;
        const registrarName = formData.get("registrarName") as string;
        const officialWebsite = formData.get("officialWebsite") as string;
        const emailAddress = formData.get("emailAddress") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const faxNumber = formData.get("faxNumber") as string;
        const availableDegrees = [formData.get("BSC"), formData.get("MSC")].filter(value => value !== null) as string[];
        const hasClub = formData.get("hasClub") === "true" ? true : false as boolean;
        const hasElectricity = formData.get("hasElectricity") === "true" ? true : false as boolean;
        const hasPlayground = formData.get("hasPlayground") === "true" ? true : false as boolean;
        const hasLab = formData.get("hasLab") === "true" ? true : false as boolean;
        const moreInfo = formData.get("moreInfo") as string;
        const data = { university_name, rank, yearOfEstablishment, viceChancellorName, registrarName, officialWebsite, emailAddress, phoneNumber, faxNumber, availableDegrees, hasClub, hasElectricity, hasPlayground, hasLab, moreInfo }


        if (university_name && rank && yearOfEstablishment && viceChancellorName && registrarName && officialWebsite && emailAddress && phoneNumber && faxNumber && availableDegrees && moreInfo) {
            const res = await db.university.create({
                data
            })
            redirect("/editor/" + res.id)

        } else {
            console.log("problem creating")
        }
    }
    return <div>
        <Card>
            <CardHeader>
                <CardTitle>Add University</CardTitle>
                <CardDescription>Please ensure that all fields are filled in and unique!</CardDescription>
                <Separator className="my-4" />
            </CardHeader>
            <CardContent>
                <form action={addUniversity} className="flex flex-col gap-2 w-full" >
                    <InputWLabel label="University Name" name="university_name" />
                    <InputWLabel label="Rank" name="rank" type="number" />
                    <InputWLabel label="Year of Establishment" name="yearOfEstablishment" type="number" />
                    <InputWLabel label="Vice Chancellor Name" name="viceChancellorName" />
                    <InputWLabel label="Registrar Name" name="registrarName" />
                    <InputWLabel label="Official Website" name="officialWebsite" type="url" />
                    <InputWLabel label="Email Address" name="emailAddress" type="email" />
                    <InputWLabel label="Phone Number" name="phoneNumber" />
                    <InputWLabel label="Fax Number" name="faxNumber" />
                    <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Offered Degree:</h4>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="bsc"
                                    type="checkbox"
                                    value="BSC"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    name="BSC"
                                />
                                <label
                                    htmlFor="bsc"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Bachelors
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="msc"
                                    type="checkbox"
                                    value="MSC"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    name="MSC"
                                />
                                <label
                                    htmlFor="msc"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Masters
                                </label>
                            </div>
                        </li>

                    </ul>

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="moreInfo">Aditional Information:</Label>
                        <MarkdownEditor />
                    </div>


                    <SubmitButton text="Add University" />


                </form>
            </CardContent>

        </Card>

    </div>;
};

export default page;