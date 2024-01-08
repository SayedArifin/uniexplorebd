
import UserList from "../../_components/UserList"
import { Suspense } from "react"

const page = async () => {

    return (
        <div className="">
            <div>
                <Suspense fallback={<p>loading</p>}><UserList /></Suspense>
            </div>
        </div>
    )
}

export default page
