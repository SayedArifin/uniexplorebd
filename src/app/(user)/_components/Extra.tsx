import { BiXCircle } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";

const Extra = ({ has, label }: { has: boolean, label: string }) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                {has ? (
                    <MdOutlineVerified size={20} color="green" />
                ) : (
                    <BiXCircle size={20} color="red" />
                )}
            </div>
            <p className="text-xs">{label}</p>
        </div>
    );
};
export default Extra;