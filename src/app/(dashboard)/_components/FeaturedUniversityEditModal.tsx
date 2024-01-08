"use client"
import { FeaturedUniversityDelete, FeaturedUniversityEdit } from "@/action/index";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { FeaturedUniversity } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
interface featuredUniversityShowCardProps {
    data: FeaturedUniversity
}
export default function FeaturedUniversityEditModal({ data }: featuredUniversityShowCardProps) {
    const router = useRouter();
    const [isOpen, setISOpen] = useState(false);
    const [university_name, setName] = useState(data.university_name);
    const [image_url, setUrl] = useState(data.image_url);
    const id = data.id;
    const [href, sethref] = useState(data.href);
    const onSubmit = async () => {
        if (university_name === "" || image_url === "") {
            toast.error("Image Url and University Name must be provided")
            return;
        } else {
            try {
                const data = await FeaturedUniversityEdit(id, university_name, image_url, href)
                toast.success(data.university_name + "successfully updated as featured University");
                router.refresh();
                setISOpen(false);

            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")

            }
        }
    }

    const onDelete = async (id: string) => {
        try {
            await FeaturedUniversityDelete(id);
            toast.success("Deleted Successfully");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");

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
                    Change
                </Button>

            </div>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={() => setISOpen(false)}>
                <ModalContent>

                    <>
                        <ModalHeader className="flex flex-col gap-1">Modify Featured University</ModalHeader>

                        <ModalBody>
                            <Input value={university_name} onChange={(e) => setName(e.target.value)} type="text" variant={"underlined"} label="University Name" isRequired />
                            <Input value={image_url} onChange={(e) => setUrl(e.target.value)} type="url" variant={"underlined"} label="Image Url" isRequired />
                            <Input value={href || ""} onChange={(e) => sethref(e.target.value)} type="text" variant={"underlined"} label="href" />

                        </ModalBody>

                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => setISOpen(false)}>
                                Close
                            </Button>
                            <Button color="warning" onPress={onSubmit}>
                                Update
                            </Button>
                            <Button color="danger" onPress={() => onDelete(id)}>Delete</Button>

                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </>
    );
}
