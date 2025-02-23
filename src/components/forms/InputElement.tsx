import { ChangeEvent } from "react";
import { debounce } from "lodash-es";

interface Props {
    inputValue: string
    inputLabel: string,
    inputName: string
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputElement: React.FC<Props> = (props) => {
    const { inputValue, inputLabel, inputName, handleOnChange } = props;    
    
    return (
        <div className="relative z-0 w-full mb-5 group capitalize">
            <input                
                onChange={debounce(handleOnChange, 500)}
                type="text"
                name={inputName}
                id={inputName}
                value={inputValue}
                className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB]  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                placeholder=" "
                required
            />
            <label
                htmlFor={inputLabel}
                className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >{inputLabel}</label>
        </div>
    );
}
export default InputElement