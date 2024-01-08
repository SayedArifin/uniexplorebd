"use client"

import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { useRef } from "react"
import { carousel } from "@prisma/client"
import Image from "next/image"


export function BannerCarousel({ carousels }: { carousels: carousel[] }) {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })

    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className=""
        >
            <CarouselContent className="">
                {carousels.map((carousel, index) => (
                    <CarouselItem key={index}>
                        <div className="flex justify-center items-center"> <Image src={carousel.image_url} alt={carousel.title} width={1000} height={200} /></div>
                    </CarouselItem>
                ))}
            </CarouselContent>

        </Carousel>
    )
}
