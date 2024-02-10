import { VerifiedIcon } from "lucide-react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

const ShowCaseCard = ({ university }: {
    university: {
        id: string;
        university_name: string;
        availableDegrees: string[];
        rank: number;
        hasRepresentative: boolean;
    }
}) => {
    const degreeMapping = {
        'BSC': 'Bachelor',
        'MSC': 'Masters',
    } as { [key: string]: string };

    const getRankColor = () => {
        switch (university.rank) {
            case 1:
                return "text-yellow-500";
            case 2:
                return "text-[#aea1a1]";
            case 3:
                return "text-[#CD7F32]";
            default:
                return "text-primary";
        }
    };


    return (
        <Link className="" href={`/universities/${university.id}`}>
            <div className={`flex bg-slate-100 dark:bg-slate-600  items-center hover:shadow-lg transition delay-150 duration-100 ease-in-out hover:scale-105 transform shadow-sm shadow-blue-300 dark:shadow-red-700`}>
                <div className={`font-bold text-6xl  ${getRankColor()}`}>
                    {university.rank}
                    <span className="text-sm">Rank</span>
                </div>
                <div className="container">
                    <p className="font-bold md:text-2xl flex items-center gap-2">{university.university_name}<span className="text-primary">{university.hasRepresentative && <MdVerified />}</span></p>
                    <p className="text-sm flex gap-2 text-primary">
                        Degree: {university.availableDegrees.map(degree => (
                            <span key={degree}>{degreeMapping[degree]}</span>
                        ))}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ShowCaseCard;
