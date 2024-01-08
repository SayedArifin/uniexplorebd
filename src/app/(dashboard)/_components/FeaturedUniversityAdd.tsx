"use client"
import { FeaturedUniversityAdd } from "@/action/index";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function FeaturedUniversityAddModal() {

    const [isOpen, setISOpen] = useState(false);
    const [university_name, setName] = useState("");
    const [image_url, setUrl] = useState("");
    const [href, sethref] = useState("");
    const route = useRouter();
    const onSubmit = async () => {
        if (university_name === "" || image_url === "") {
            toast.error("Image Url and University Name must be provided here")
            return;
        } else {
            try {
                const data = await FeaturedUniversityAdd(university_name, image_url, href)
                setName("")
                setUrl("")
                sethref("")
                toast.success(data.university_name + "has been added as a Featured University")
                route.refresh();

                setISOpen(false)
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")

            }
        }
    }


    return (
        <>
            <div className="flex flex-wrap gap-3">

                <Button

                    variant="flat"
                    color="danger"
                    onPress={() => setISOpen(true)}
                    className="capitalize"
                >
                    Add Featured Universite
                </Button>

            </div>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={() => setISOpen(false)}>
                <ModalContent>

                    <>
                        <ModalHeader className="flex flex-col gap-1">Add Featured University</ModalHeader>
                        <ModalBody>
                            <Input value={university_name} onChange={(e) => setName(e.target.value)} type="text" variant={"underlined"} label="University Name" isRequired />
                            <Input value={image_url} onChange={(e) => setUrl(e.target.value)} type="url" variant={"underlined"} label="Image Url" isRequired />
                            <Input value={href || ""} onChange={(e) => sethref(e.target.value)} type="text" variant={"underlined"} label="href" />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => setISOpen(false)}>
                                Close
                            </Button>
                            <Button color="danger" onPress={onSubmit}>
                                Add
                            </Button>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </>
    );
}