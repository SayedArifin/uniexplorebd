import { Suspense } from "react"
import UniversityDetails from "../../_components/UniversityDetails"

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <Suspense fallback={<p className="animate-pulse">Please Wait. We are fetching University Information from our server</p>}>
                <UniversityDetails id={params.id} />
            </Suspense>
        </div>
    )
}

export default page
