import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { BiCard, BiLayerPlus } from "react-icons/bi";
import { BiHome } from "react-icons/bi";
import { Plus, User } from "lucide-react";
import { MdFeedback, MdRealEstateAgent } from "react-icons/md";


export const EditorSidebarItems = [
    { icon: <BiHome size={25} />, text: "Home", href: "/editor" },
    { icon: <BiLayerPlus size={25} />, text: "Add University", href: "/editor/add_university" },
    { icon: <Plus size={25} />, text: "Department", href: "/editor/department" },
    { icon: <ImBlog size={25} />, text: "Article", href: "/editor/article" },
];
export const AdvertizerSidebarItems = [
    { icon: <BiHome size={25} />, text: "Home", href: "/advertizer" },
    { icon: <AiOutlineVideoCameraAdd size={25} />, text: "Featured Logo", href: "/advertizer/featured" },
    { icon: <AiOutlineVideoCameraAdd size={25} />, text: "Carousel Banner", href: "/advertizer/carousel" },

];
export const OwnerSidebarItems = [
    { icon: <BiHome size={25} />, text: "Home", href: "/owner" },
    { icon: <User size={25} />, text: "User", href: "/owner/user" },
    { icon: <MdFeedback size={25} />, text: "Feedback", href: "/owner/feedback" },
    { icon: <MdRealEstateAgent size={25} />, text: "Representative", href: "/owner/representative" }

];
export const RepresentativeSidebarItems = [
    { icon: <BiHome size={25} />, text: "Home", href: "/representative" },
    { icon: <User size={25} />, text: "Advertizement", href: "/representative/advertizement" },


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
            label: "articles",
            href: "/articles",
        },
        {
            label: "About us",
            href: "/about",
        }
    ],

};