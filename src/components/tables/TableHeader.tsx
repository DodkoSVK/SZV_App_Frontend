import { TableHeaderData } from "../../assets/types/tableTypes";
import plusIcon from '../../assets/plus.svg';

interface Props {
    headerData: TableHeaderData[];
    addTitle: string
};

const TableHeader: React.FC<Props> = (props) => {
    //Import props
    const { headerData, addTitle } = props;

    return (        
        <tr>                       
            {Array.isArray(headerData) && headerData.length > 0 ? (
                <>
                {headerData.map(header => (
                    <th key={header.name} scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            {header.name}
                            {header.sortable && (
                                <button                                            
                                    name="fname">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg> 
                                </button>
                            )}
                        </div>
                    </th>                    
                ))}
                <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                <button className="flex items-center space-x-2 uppercase">
                                    <span>{addTitle}</span>
                                    <img src={plusIcon} alt="Add" className="w-6 h-6" />
                                </button>
                            </div>
                </th>
                </>
            ) : (
                <th colSpan={headerData?.length || 1} className="px-6 py-4 text-center text-white font-bold text-2xl">
                    Nedokazal som nacitat ziadne data.
                </th>
            )} 
        </tr>                              
    );
};

export default TableHeader;