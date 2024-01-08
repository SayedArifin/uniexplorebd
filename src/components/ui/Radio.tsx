"use client"
interface RadioProps {
    id: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: () => void;
}

const RadioBool: React.FC<RadioProps> = ({ id, label, checked, disabled = false, onChange }) => {
    return (
        <div>
            <div className="flex items-center mb-4">
                <input
                    id={id}
                    type="radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    name={id}
                    checked={checked}
                    disabled={disabled}
                    onClick={onChange}
                />
                <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </label>
            </div>
        </div>
    );
};

export default RadioBool;
