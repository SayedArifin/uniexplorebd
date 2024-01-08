import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import ViewModify from "../../_components/ViewModify";
interface pageProps {
    params: { university_id: string }
}
const page: React.FC<pageProps> = async ({ params }) => {
    const { university_id } = params
    const university = await db.university.findUnique({
        where: {
            id: university_id
        },
        include: {
            branches: {
                include: {
                    departments: {

                        include: {
                            department: {

                                select: {

                                    shortName: true,


                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return <Card>
        <CardHeader>
            <CardTitle>
                {university?.university_name}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <ViewModify university={university} />
        </CardContent>
    </Card>;
};

export default page;