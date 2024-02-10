"use cilent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Instagram, Twitter, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdCall, MdEmail } from "react-icons/md";

const page = () => {
    return <div>
        <Card className="">
            <CardHeader>
                <CardTitle>Reach Your Audience with Us!</CardTitle>
                <CardDescription>Are you looking to increase your university&apos;s visibility? Partner with us to reach our diverse community of over 100k users and promote your university effectively.</CardDescription>
            </CardHeader>
            <CardContent>

                <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <FaWhatsapp />
                        <span> Contact us via WhatsApp at: +8801572702411
                        </span>
                    </li>
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Twitter />
                        <span>Connect with us on Twitter: @UniExploreBD</span>
                    </li>
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <MdCall />
                        <span>For hotline assistance, dial: +8801909232690</span>
                    </li>
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <MdEmail />
                        <span>Reach out via email: admin@uniexplorebd.vercel.app</span>
                    </li>

                </ul>

            </CardContent>
        </Card>
    </div >;
};

export default page;
