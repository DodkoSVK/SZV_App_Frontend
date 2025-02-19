import { ChangeEvent } from "react";
import { PersonSelect } from "../../assets/types/personTypes";

interface Props {
    selectOptions: PersonSelect[];
    selectLabel: string;
    selectedItem: (id: number) => void;
}

const SelectElement: React.FC<Props> = (props) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const itemId = parseInt(e.target.value, 10);
        props.selectedItem(itemId);
    }

    return (
        <div className="relative z-0 w-full mb-5 group">
            <select
                className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                defaultValue=""
                onChange={handleChange}
            >
                <option value="" hidden className="text-[#F7F9FB] bg-[#1D2731]"></option>
                {props.selectOptions && props.selectOptions.length > 0 ? (
                    props.selectOptions.map((person) => (
                        <option key={person.id} value={person.id} className="text-[#F7F9FB] bg-[#1D2731]">
                            {person.fname} {person.sname}
                        </option>
                    ))
                ) : (
                    <option value="" disabled className="text-[#F7F9FB] bg-[#1D2731]">Žiadni ľudia bez klubu</option>
                )}
            </select>
            <label
                htmlFor=""
                className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-x-hidden peer-placeholder-shown:-translate-y-full"
            >
                {props.selectLabel}
            </label>
        </div>
    );
};

export default SelectElement;