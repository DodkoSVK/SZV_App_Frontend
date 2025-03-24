import { MouseEvent } from "react";

interface Props {
    buttonType: "submit" | "reset" | "button";
    buttonText: string;
    buttonName: string;
    clickAction?: (e: MouseEvent<HTMLButtonElement>) => void;
    size?: "sm" | "md" | "lg";
}

const GreenButton: React.FC<Props> = (props) => {
    const sizeClassMap = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-6 py-3"
    };

    const sizeClass = sizeClassMap[props.size ?? "md"];

    return (
        <button
            onClick={props.clickAction}
            name={props.buttonName}
            type={props.buttonType}
            className={`text-green-700 capitalize hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-center me-2 mb-2 ${sizeClass}`}>
            {props.buttonText}
        </button>
    );
};

export default GreenButton;
