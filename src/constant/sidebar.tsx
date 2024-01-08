import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { BiLayerPlus } from "react-icons/bi";
import { BiHome } from "react-icons/bi";
import { Plus, User } from "lucide-react";


export const EditorSidebarItems = [
    { icon: <BiHome size={25} />, text: "Home", href: "/editor" },
    { icon: <BiLayerPlus size={25} />, text: "Add University", href: "/editor/add_university" },
    { icon: <Plus size={25} />, text: "Department", href: "/editor/department" },
    { icon: <ImBlog size={25} />, text: "Blogs", href: "/editor/bloags" },

];
export const AdvertizerSidebarItems = [
    { icon: <BiHome size={25} />, text: "Home", href: "/advertizer" },
    { icon: <AiOutlineVideoCameraAdd size={25} />, text: "Featured Logo", href: "/advertizer/featured" },
    { icon: <AiOutlineVideoCameraAdd size={25} />, text: "Carousel Banner", href: "/advertizer/carousel" },

];
export const OwnerSidebarItems = [
    { icon: <BiHome size={25} />, text: "Home", href: "/owner" },
    { icon: <User size={25} />, text: "User", href: "/owner/user" },

];

export const siteConfig = {
    name: "UniExplore-BD",
    description: "Find & Shortlist university in a minute.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Find University",
            href: "/universities",
        },
        {
            label: "Compare University",
            href: "/compare",
        },
        {
            label: "Blog",
            href: "/blog",
        },
        {
            label: "About us",
            href: "/about",
        }
    ],

};