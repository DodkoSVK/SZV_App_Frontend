import editIcon from '../../assets/edit.svg';

interface Props {
    rowData: { [key: string]: string };
    rowId: number;
    editButtonTitle: string;
    editButtonAction: (competitionId: number) => void;
}

const TableRow: React.FC<Props> = (props) => {
const { rowData, rowId, editButtonTitle, editButtonAction } = props;

  if (!rowData) return null; // ✅ predídeme pádu ak príde undefined

    return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        {Object.values(rowData).map((data, index) => (
        <td key={index} className="px-6 py-4">{data}</td>
        ))}
        <td className="px-6 py-4">
            <button onClick={() => editButtonAction(rowId)}>
                <span className="sr-only">{editButtonTitle}</span>
                <img src={editIcon} alt="Edit" className="w-4 h-4" />
            </button>
        </td>
    </tr>
    );
};

export default TableRow;
