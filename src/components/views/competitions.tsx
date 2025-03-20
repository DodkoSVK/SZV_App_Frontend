import { useEffect, useState } from "react";
//Methods
import { getCompetitions } from "../../apis/CompetitionApis";
//Types
import { Competition } from "../../assets/types/competitionTypes";
//Components
import TableHeader from "../tables/TableHeader";
import TableRow from "../tables/TableRow";





const TheCompetitions: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[] | { message: string }>({message: "Načítavam súťaže..."});
    // Fetching all competitions
    const fetchCompetitions = async () => {
        const data = await getCompetitions();
        if (Array.isArray(data)) {
            setCompetitions(data.map((competition) => ({
                id: competition.clid,
                league: competition.name,
                group: competition.group_name,
                city: competition.city,
                date: competition.date,
                round: competition.round
            })))
        }
        console.log(`🟢 Súťaže: ${JSON.stringify(competitions)}`);
    };

    useEffect(() => {
        fetchCompetitions();
    }, []);
    useEffect(() => {
        console.log(`🟢 Súťaže: ${JSON.stringify(competitions)}`);
    }, [competitions]);

    return (
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Súťaže SZV</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 rounded-sm border border-gray-500 border-solid">
                <table className="w-full text-sm text-left rtl:text-right text-[#F7F9FB]">
                    <thead className="text-xs uppercase bg-[#0B3C5D]">
                        <TableHeader
                            headerData={[
                                { name: 'Kolo', sortable: true },
                                { name: 'Liga', sortable: true },
                                { name: 'Skupina', sortable: true },
                                { name: 'Miesto konania', sortable: true },
                                { name: 'Dátum', sortable: true }                   
                            ]}
                            addTitle="Pridať súťaž"
                        />
                    </thead>
                    <tbody>
                        {Array.isArray(competitions) && competitions.length > 0 ? (
                            competitions.map((competition) => (
                                <TableRow
                                    key={competition.id}
                                    rowData={competition}
                                    keys={["round", "league", "group", "city", "date"]}
                                    editTitle="Upraviť súťaž"
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
            
        </article>
    );
};

export default TheCompetitions;