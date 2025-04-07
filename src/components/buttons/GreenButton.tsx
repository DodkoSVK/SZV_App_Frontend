import { MouseEvent, ReactNode } from "react";

interface Props {
    buttonType: "submit" | "reset" | "button";
    buttonText?: string; // stále môžeš použiť len text
    buttonName: string;
    clickAction?: (e: MouseEvent<HTMLButtonElement>) => void;
    size?: "sm" | "md" | "lg";
    children?: ReactNode; // umožní <span> + <svg> kombináciu
}

const GreenButton: React.FC<Props> = (props) => {
    const {buttonType, buttonText, buttonName, clickAction, size = "md", children,} = props;
    const sizeClassMap = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-6 py-3",
    };
    const sizeClass = sizeClassMap[size];

    return (
        <button
        onClick={clickAction}
        name={buttonName}
        type={buttonType}
        className={`flex flex-row items-center gap-2 rounded-lg border border-green-500 text-green-500 cursor-pointer hover:bg-green-500 hover:text-white ${sizeClass}`}
        >
        {children ? children : <span>{buttonText}</span>}
        </button>
    );
};

export default GreenButton;
