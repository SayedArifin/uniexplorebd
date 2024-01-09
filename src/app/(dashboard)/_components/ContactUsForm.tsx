"use client"
import { CreateFeedback } from "@/action";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const ContactUsForm = () => {
    const session = useSession()
    const [email, setEmail] = useState(session.data?.user?.email || "")
    const [subject, setSubject] = useState("")
    const [msg, setMsg] = useState("")
    const { pending } = useFormStatus();
    const handleSubmit = async () => {
        try {
            await CreateFeedback(email, subject, msg)
            setSubject("")
            setMsg("")
            toast.success("thanks! We got your feedback")
        } catch (error) {
            toast.error("Sorry, something went wrong")
        }
    }
    return <section className="">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-primay">
                Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                Got a technical issue or Have any Feedback for us?
            </p>
            <div>
                <form action={handleSubmit}>
                    <div>

                        <Input
                            isDisabled={email === session.data?.user?.email}
                            label="Your Email"
                            variant="underlined"
                            type="email"
                            value={email}
                            id="email"
                            placeholder="name@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            isRequired
                        />
                    </div>
                    <div>

                        <Input
                            label="Subject"
                            variant="underlined"
                            type="text"
                            id="subject"

                            placeholder="Let us know how we can help you"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            isRequired
                        />
                    </div>
                    <div className="sm:col-span-2">

                        <Textarea
                            variant="underlined"
                            id="message"
                            onChange={(e) => setMsg(e.target.value)}
                            value={msg}
                            isRequired
                            label="Message"
                            placeholder="describe your issue here..."
                        ></Textarea>
                    </div>

                    <Button
                        className="my-5 w-full"
                        disabled={pending}
                        type="submit"

                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    </section>;
};

export default ContactUsForm;