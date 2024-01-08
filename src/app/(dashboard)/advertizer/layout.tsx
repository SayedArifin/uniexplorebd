import AdvertizerSidebar from "@/components/AdvertizerSidebar";
import { AdvertizerSidebarItems } from "@/constant/sidebar";

interface layoutProps {
    children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {

    return <div>
        <AdvertizerSidebar sidebarItems={AdvertizerSidebarItems}>
            {children}
        </AdvertizerSidebar>
    </div>;
};

export default layout;