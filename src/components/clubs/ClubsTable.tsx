import { Club } from '../../assets/types/index';
import { useRef, MouseEvent } from 'react';
import editIcon from '../../assets/edit.svg';
import plusIcon from '../../assets/plus.svg';

interface Props {
    clubs: Club[] | { message: string };
    sortBy: (key: string) => void;
    editClub: (id: number) => void;
    createClub: () => void;
}

const ClubsTable: React.FC<Props> = (props) => {
    const sortByNameButton = useRef<HTMLButtonElement>(null);
    const sortByICOButton = useRef<HTMLButtonElement>(null);
    const sontByChairmanButton = useRef<HTMLButtonElement>(null);

    const { clubs } = props;
    const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
        const buttonName = e.currentTarget.name;
        props.sortBy(buttonName);
    };
    const handleEdit = (id: number) => {
        console.log(`Editujem klub s id: ${id}`);
        props.editClub(id);
    }
    const handleAddClub = () => {
        console.log('Pridávam nový klub');
        props.createClub();
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 mt-10 rounded-sm border border-white-900 border-solid">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Klub
                                <button
                                    ref={sortByNameButton}
                                    onClick={handleSort}
                                    name="name">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Sídlo</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                IČO
                                <button
                                    ref={sortByICOButton}
                                    onClick={handleSort}
                                    name="ico">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Mail</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Štatutár
                                <button
                                    ref={sontByChairmanButton}
                                    onClick={handleSort}
                                    name="chairman">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center uppercase text-xs text-gray-700">
                                <button onClick={() => handleAddClub()} className="flex items-center space-x-2">
                                    <img src={plusIcon} alt="Add" className="w-4 h-4" />
                                    <span>Pridať klub</span>
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(clubs) ? (
                        clubs.map(club => (
                            <tr key={club.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {club.name}
                                </th>
                                <td className="px-6 py-4">
                                    {club.street}, {club.postal} {club.city}
                                </td>
                                <td className="px-6 py-4">
                                    {club.ico}
                                </td>  
                                <td className="px-6 py-4">
                                    {club.mail}
                                </td> 
                                <td className="px-6 py-4">
                                    {club.f_name} {club.surname}
                                </td> 
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEdit(club.id)}>                                
                                        <span className="sr-only">Edit</span>
                                        <img src={editIcon} alt="Edit" className="w-4 h-4" />                          
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-white font-bold text-2xl">
                                {clubs.message}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>        
    );
};

export default ClubsTable;