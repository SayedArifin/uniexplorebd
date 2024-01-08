
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddBanner } from "../../_components/AddBanner"
import { db } from "@/lib/db"
import { carousel } from "@prisma/client"
import Image from "next/image"
import { Card as Cards, CardFooter, Button, Image as Img } from "@nextui-org/react";
import SubmitButton from "@/components/SubmitButton"
import { revalidatePath } from "next/cache"
const page = async () => {
    const banners = await db.carousel.findMany()
    const onDelete = async (formData: FormData) => {
        "use server"
        const id = formData.get('id') as string;
        const res = await db.carousel.delete({
            where: {
                id
            }
        })
        revalidatePath("advertizer/carousel")
    }
    return (
        <div>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Carousel Banner</h1>
            <Card>
                <CardHeader>
                    <AddBanner />
                </CardHeader>
                <CardContent>
                    <Card>
                        <CardHeader>
                            <CardTitle>All Active Banner</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center items-center gap-5">
                            {banners.length > 0 ? (
                                banners.map((banner: carousel) => (
                                    <Cards key={banner.id} isFooterBlurred className=" col-span-12 sm:col-span-5">

                                        <Img
                                            as={Image}
                                            isZoomed
                                            removeWrapper
                                            alt={banner.title} width={800} height={200} className="rounded-md"
                                            src={banner.image_url}
                                        />
                                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                            <div>
                                                <p className="capitalize truncate">{banner.title}</p>

                                            </div>
                                            <form action={onDelete}>
                                                <input name="id" type="hidden" value={banner.id} />
                                                <SubmitButton text="Delete Banner" />
                                            </form>
                                        </CardFooter>
                                    </Cards>

                                ))
                            ) : <p>No Banner Ad to show</p>}
                        </CardContent>

                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

export default page
