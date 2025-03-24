//Types
import { toInteger } from "lodash-es";
import { TableHeaderData } from "../../assets/types/tableTypes";

//Components
import TableHeader from "../tables/TableHeader";
import TableRow from "../tables/TableRow";

interface Props {
    headerData: TableHeaderData[];
    headerAddTitle: string;
    handleAddButton: () => void;  
    rowsData: Array<{ [key: string]: string }>
    rowEditTitle: string;
    handleEditButton: (competitionId: number) => void;
};

const Table: React.FC<Props> = (props) => {

    const { headerData, headerAddTitle, handleAddButton, rowsData, rowEditTitle, handleEditButton } = props;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 rounded-sm border border-gray-500 border-solid">
                <table className="w-full text-sm text-left rtl:text-right text-[#F7F9FB]">
                    <TableHeader
                        headerData={headerData}
                        addButtonText={headerAddTitle}
                        handleAddButton={handleAddButton}
                    />                    
                    <tbody>
                        {Array.isArray(rowsData) && rowsData.length > 0 ? (
                            rowsData.map((row) => (
                            <TableRow
                                key={row.id}                              
                                rowData={row}
                                rowId={toInteger(row.id)}
                                editButtonTitle={rowEditTitle}
                                editButtonAction={handleEditButton}
                            />
                            ))
                        ) : (
                            <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-white font-bold text-2xl">
                                Nenašli sa žiadne súťaže.
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    );
};

export default Table;