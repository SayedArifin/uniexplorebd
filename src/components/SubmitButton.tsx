"use client"
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
interface SubmitButtonProps {
    text: any;
    className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, className }) => {
    const { pending } = useFormStatus();


    return <Button disabled={pending} type="submit" className={className ? className : "w-full"}>{text}</Button>;
};

export default SubmitButton;