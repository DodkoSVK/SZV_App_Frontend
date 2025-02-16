import { MouseEvent } from "react";

interface Props {
    buttonType: "submit" | "reset" | "button";
    buttonText: string
    buttonName: string
    clickAction?: (e: MouseEvent<HTMLButtonElement>) => void;
}
const RedButton: React.FC<Props> = (props) => {
    return (
        <button
            onClick={props.clickAction}
            name={props.buttonName}
            type={props.buttonType}
            className="capitalize text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {props.buttonText}
        </button>
    )
};

export default RedButton;
