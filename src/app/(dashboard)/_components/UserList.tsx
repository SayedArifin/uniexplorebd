
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

import Image from "next/image";
import { EditUserRole } from "./EditUserRole";


interface UserListProps {
}

const UserList: React.FC<UserListProps> = async () => {
    const users = await db.user.findMany()
    return <Card>
        <CardHeader>
            <CardTitle>
                All User
            </CardTitle>
        </CardHeader>
        <CardContent>
            {users.map((user) => (
                <div key={user.id} className="py-3 sm:pb-4 rounded-md px-5">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 text-black dark:text-white ">
                            <Image src={user.image} alt="pp" width={50} height={50} className="rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium  truncate ">
                                {user.email}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                role: {user.role}
                            </p>
                        </div>
                        <div className="inline-flex items-center font-semibold p-5 z-20 gap-2">
                            <EditUserRole user={user} />
                        </div>
                    </div>
                    <hr />
                </div>
            )
            )}
        </CardContent>
    </Card>;
};

export default UserList;