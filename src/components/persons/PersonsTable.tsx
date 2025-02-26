import { Person } from "../../assets/types/personTypes";
import { useRef, MouseEvent } from "react";
import editIcon from '../../assets/edit.svg';
import plusIcon from '../../assets/plus.svg';

interface Props {
    persons: Person[] | { message: string };
    sortBy: (key: string) => void;
    formUiData: (personId: number ) => void
}

const PersonsTable: React.FC<Props> = (props) => {
    const sortByFName = useRef<HTMLButtonElement>(null);
    const sortBySName = useRef<HTMLButtonElement>(null);
    const sortByDoB = useRef<HTMLButtonElement>(null);
    const sortByClub = useRef<HTMLButtonElement>(null);

    const { persons, sortBy, formUiData } = props;
    
    const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
        const buttonName = e.currentTarget.name;
        sortBy(buttonName);
    }
    const handleEdit = (id: number) => {
        //console.log(`Editujem osobu s id: ${id}`);
        formUiData(id);
    }
    const handleAdd = () => {
        //console.log('Pridávam novú osobu.');
        formUiData(0);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 rounded-sm border border-gray-500 border-solid">
            <table className="w-full text-sm text-left rtl:text-right text-[#F7F9FB]">
                <thead className="text-xs uppercase bg-[#0B3C5D]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Meno
                                <button
                                    ref={sortByFName}
                                    onClick={handleSort}
                                    name="fname">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            </div>
                        </th>                        
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Priezvisko
                                <button
                                    ref={sortBySName}
                                    onClick={handleSort}
                                    name="sname">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Dátum narodenia
                                <button
                                    ref={sortByDoB}
                                    onClick={handleSort}
                                    name="birth">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Klub
                                <button
                                    ref={sortByClub}
                                    onClick={handleSort}
                                    name="club">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                <button onClick={() => handleAdd()} className="flex items-center space-x-2 uppercase">
                                    <span>Pridať človeka</span>
                                    <img src={plusIcon} alt="Add" className="w-6 h-6" />
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(persons) ? (
                        persons.map(person => (
                            <tr key={person.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {person.fname}
                                </th>
                                <td className="px-6 py-4">
                                    {person.sname}
                                </td>
                                <td className="px-6 py-4">
                                    {person.birth}
                                </td>  
                                <td className="px-6 py-4">
                                    {person.club}
                                </td>                                 
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEdit(person.id)}>                                
                                        <span className="sr-only">Edit</span>
                                        <img src={editIcon} alt="Edit" className="w-4 h-4" />                          
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-white font-bold text-2xl">
                                {persons?.message}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>        
    )
};

export default PersonsTable;