import { HiDocumentSearch } from "react-icons/hi";

interface LogoProps {
}

const Logo: React.FC<LogoProps> = () => {
    return <p className="flex gap-1 justify-start items-center font-extrabold">
        <span className="text-primary"><HiDocumentSearch /></span>
        <span className="">UniExplore-BD</span>
    </p>;
};

export default Logo;