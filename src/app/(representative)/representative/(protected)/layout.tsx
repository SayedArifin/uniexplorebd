import { authOptions } from "@/app/option";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

import RepresentativeSidebar from "../../_component/RepresentativeSidebar";
import { RepresentativeSidebarItems } from "@/constant/sidebar";

const layout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const session = await getServerSession(authOptions)
    if (session) {
        const res = await db.representative.findFirstOrThrow({
            where: {
                loggedinEmail: session.user?.email!
            }, select: {
                id: true
            }
        })
        if (res) {
            return (
                <div><RepresentativeSidebar sidebarItems={RepresentativeSidebarItems}>{children}
                </RepresentativeSidebar></div>
            )
        }
    }
    ;

};

export default layout;