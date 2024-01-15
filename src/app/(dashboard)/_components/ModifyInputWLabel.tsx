"use client"

import { Input } from "@nextui-org/react";


interface InputWLabelProps {
    label: string | number;
    type?: string;
    name: string;
    placeholder?: string;
    value?: any;
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

            <Input
                label={label}
                variant="underlined"
                isDisabled={disabled}
                value={value}
                type={type ? type : "text"}
                name={name}
                id={name}
                placeholder={placeholder ? placeholder : "Please Enter " + label}
                onChange={onchange}
                isRequired
            />
        </div>
    );
};

export default InputWLabel;
