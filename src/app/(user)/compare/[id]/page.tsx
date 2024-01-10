import { Suspense } from "react";
import CompareShowcse from "../../_components/CompareShowcse";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/option";

const page = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);

    const { id } = params;
    const bookmark = await db.bookmark.findUnique({
        where: {
            id,
        },
        select: {
            selectedUniversityId: true,
            choosedDepartmentId: true,
            is_visible: true,
            User: true,
        },
    });

    if (!bookmark) {
        notFound()
    }
    if (session) {
        session.user?.email === bookmark?.User?.email && true
    } else if (bookmark.is_visible) {
        true
    } else {
        notFound()
    }
    return <div>
        <Suspense fallback={<p>We are fatching data</p>}>
            <CompareShowcse choosedDp={bookmark.choosedDepartmentId} selected={bookmark.selectedUniversityId} />
        </Suspense>
    </div>;
};
export default page;