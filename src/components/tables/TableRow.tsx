import editIcon from '../../assets/edit.svg';

interface Props {
    rowData: Record<string, any>;
    keys: string[];
    editTitle: string;
}

const TableRow: React.FC<Props> = (props) => {
    const { rowData, keys, editTitle } = props;
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            {keys.map((key) => (
                <td 
                    key={key} 
                    scope="row"
                    className="px-6 py-4">{String(rowData[key])}</td>
            ))}
            <td className="px-6 py-4">
                <button>                                
                    <span className="sr-only">{editTitle}</span>
                    <img src={editIcon} alt="Edit" className="w-4 h-4" />                          
                </button>
            </td>
        </tr>
    );
};

export default TableRow;
