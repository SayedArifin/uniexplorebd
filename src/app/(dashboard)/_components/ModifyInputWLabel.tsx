"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWLabelProps {
    label: string | number;
    type?: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    disabled?: boolean;
    onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWLabel: React.FC<InputWLabelProps> = ({
    label,
    type,
    name,
    placeholder,
    value,
    disabled = false,
    onchange,
}) => {
    return (
        <div className="flex flex-col w-full gap-1.5">
            <Label htmlFor={name}>{label}:</Label>
            <Input
                disabled={disabled}
                value={value}
                type={type ? type : "text"}
                name={name}
                id={name}
                placeholder={placeholder ? placeholder : "Please Enter " + label}
                onChange={onchange}
                required
            />
        </div>
    );
};

export default InputWLabel;
