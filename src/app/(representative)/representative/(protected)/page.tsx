
import EditUniversity from "../../_component/EditUniversity";
import { Suspense } from "react";

const page = async () => {
    return <Suspense fallback="please wait"><EditUniversity /></Suspense>
};

export default page;