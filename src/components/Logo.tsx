import { HiDocumentSearch } from "react-icons/hi";


const Logo = () => {
    return <p className="flex gap-1 justify-start items-center font-extrabold">
        <span className="text-primary"><HiDocumentSearch /></span>
        <span className="">UniversityFinder-BD</span>
    </p>;
};

export default Logo;