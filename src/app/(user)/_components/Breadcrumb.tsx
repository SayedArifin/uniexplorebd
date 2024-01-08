import React from "react";


const Breadcrumb = ({ steps, currentStep }: {
    steps: {
        label: string;
        component: React.JSX.Element;
    }[], currentStep: number
}) => {
    return (
        <div className="flex">
            <div className="flex px-5 py-3 text-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {steps.map((step, index) => (
                        <li key={index} className="inline-flex items-center">
                            {index > 0 && (
                                <div className="flex items-center">
                                    <svg
                                        className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                </div>
                            )}
                            {index === currentStep - 1 ? (
                                <span className="text-sm font-medium text-primary-red md:ms-2 ">
                                    {step.label}
                                </span>
                            ) : (
                                <div className="inline-flex items-center text-sm font-medium text-gray-700  dark:text-gray-400 ">
                                    {step.label}
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Breadcrumb;