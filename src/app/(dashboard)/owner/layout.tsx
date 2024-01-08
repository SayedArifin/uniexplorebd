
import OwnerSidebar from "@/components/OwnerSidebar";
import { OwnerSidebarItems } from "@/constant/sidebar";

interface layoutProps {
    children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {

    return <div>
        <OwnerSidebar sidebarItems={OwnerSidebarItems}>
            {children}
        </OwnerSidebar>
    </div>;
};

export default layout;