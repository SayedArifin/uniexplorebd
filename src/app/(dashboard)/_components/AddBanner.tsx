"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { BannerAdd, BannerDelete } from "@/action";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export function AddBanner() {
    const [title, setTitle] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [href, setHref] = useState("");
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const addBanner = async () => {
        if (title === "" || image_url === "") {
            toast.error((title == "" ? "Title" : "Image") + " not found");
        } else {
            try {
                const res = await BannerAdd(title, image_url, href)
                toast.success("Banner has been created", {
                    description: "banner has been created with " + res.title + " title",
                })
                router.refresh()
                setOpen(false)

            } catch (error) {

            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add New Banner</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload an Image</DialogTitle>
                    <DialogDescription>
                        To get started, upload your image on{" "}
                        <Link target="_blank" className="font-extrabold underline" href={"https://postimages.org/"}>
                            Post Image
                        </Link>{" "}
                        and paste the link here! Make sure to upload a 4:1 aspect ratio image for the best result.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" variant={"underlined"} label="Banner Title" isRequired />
                    <Input value={image_url} onChange={(e) => setImageUrl(e.target.value)} type="url" variant={"underlined"} label="Banner Image URL" isRequired />
                    <Input value={href} onChange={(e) => setHref(e.target.value)} type="url" variant={"underlined"} label="Article URL" />
                </div>
                <DialogFooter>
                    <Button onClick={addBanner} className="w-full" type="submit">Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
