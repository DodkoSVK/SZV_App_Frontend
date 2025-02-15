import { MouseEvent } from "react";

interface Props {
    buttonType: "submit" | "reset" | "button";
    buttonText: string
    buttonName: string
    clickAction?: (e: MouseEvent<HTMLButtonElement>) => void;
}
const YellowButton: React.FC<Props> = (props) => {
    return (
        <button
            onClick={props.clickAction}
            name={props.buttonName}
            type={props.buttonType}
            className="text-yellow-400 capitalize hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            {props.buttonText}
        </button>
    )
};

export default YellowButton;
