import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ViewModify from "@/app/(dashboard)/_components/ViewModify";
import RepresentativeSidebar from "./RepresentativeSidebar";
import { RepresentativeSidebarItems } from "@/constant/sidebar";
interface EditUniversityProps {
  id: string;
}

const EditUniversity: React.FC<EditUniversityProps> = async ({ id }) => {
  const university = await db.university.findUnique({
    where: {
      id
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
  return <RepresentativeSidebar sidebarItems={RepresentativeSidebarItems}>
    <Card>
      <CardHeader className="flex justify-center items-center">
        <CardTitle>
          {university?.university_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ViewModify university={university} />
      </CardContent>
    </Card>
  </RepresentativeSidebar>;
};

export default EditUniversity;