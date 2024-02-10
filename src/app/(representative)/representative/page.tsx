import { authOptions } from "@/app/option";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import EditUniversity from "../_component/EditUniversity";

const page = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        const res = await db.representative.findFirst({
            where: {
                loggedinEmail: session.user?.email!
            }
        })
        if (res) {
            return (
                <div><EditUniversity id={res.universityId} /></div>
            )
        } else {
            <p>not get</p>
        }
    } else {
        return <div>page</div>
    }
    ;
};

export default page;