import EditorSidebar from "@/components/EditorSidebar";
import { EditorSidebarItems } from "@/constant/sidebar";

interface layoutProps {
    children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {

    return <div>
        <EditorSidebar sidebarItems={EditorSidebarItems}>
            {children}
        </EditorSidebar>
    </div>;
};

export default layout;