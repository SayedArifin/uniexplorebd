import { Suspense } from "react"
import SinglePost from "../_components/SinglePost"
import SinglePostSK from "../_components/SinglePostSK"
import Link from "next/link"


const page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <Suspense fallback={<SinglePostSK />}>
                <SinglePost params={params} />
            </Suspense>

            <div className="space-x-10 flex justify-center text-primary font-extrabold ">
                <Link className="hover:underline" href={"/articles"}>Back to the article</Link>
                <Link className="hover:underline" href={"/"}>Back to Home</Link>
            </div>

        </div>
    )
}

export default page
