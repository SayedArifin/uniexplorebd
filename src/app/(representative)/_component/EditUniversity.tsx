import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ViewModify from "@/app/(dashboard)/_components/ViewModify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/option";


const EditUniversity = async () => {
  const session = await getServerSession(authOptions)
  const university = await db.university.findFirstOrThrow({
    where: {
      Representative: {
        loggedinEmail: session?.user?.email || "Unauthorized",
      }
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
    <CardHeader className="flex justify-center items-center">
      <CardTitle>
        {university?.university_name}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ViewModify university={university} />
    </CardContent>
  </Card>

};

export default EditUniversity;