import { RiAdminLine } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import { UserRole } from "@prisma/client";
interface VerifiedBadgeProps {
    role: UserRole;
    username: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ role, username }) => {
    let content;
    if (role === "ADVERTIZER") {
        content = "Advertizer"
    } else if (role === "EDITOR") {
        content = "Editor"
    } else if (role === "OWNER") {
        content = "Owner"
    }
    console.log(role === "EDITOR")

    return (
        <div className="flex gap-1 justify-center items-center">
            <p>{username}</p>
            <Tooltip content={content} >
                <div>
                    {role === "USER" && ""}
                    {role === "EDITOR" && <MdOutlineVerified />}
                    {role === "ADVERTIZER" && <MdOutlineVerified />}
                    {role === "OWNER" && <RiAdminLine />}
                </div>
            </Tooltip>
        </div>
    );
};

export default VerifiedBadge;