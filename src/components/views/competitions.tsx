import { useEffect, useState } from "react";
//Methods
import { getCompetitions } from "../../apis/CompetitionApis";
//Types
import { Competition } from "../../assets/types/competitionTypes";
import { FormUI } from "../../assets/types/index";
//Children Components
//import Table from "../tables/Table";
//import CompetitionForm from "../competitions/CompetitionForm";
import ContentBlock from "../contentBlock/ContentBlock";

const TheCompetitions: React.FC = () => {
    //const [competitions, setCompetitions] = useState<Competition[] | { message: string }>({message: "Načítavam súťaže..."});
    const [competitions, setCompetitions] = useState<Competition[] | { message: string }>({ message: "Načítavam súťaže..." });
    
    const [editingCompetition, setEditingCompetition] = useState<Competition>();
    const [formUiData, setFormUiData] = useState<FormUI>();

    // Fetching all competitions
    /* const fetchCompetitions = async () => {
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
    }; */
    const fetchCompetitions = async () => {
        const data = await getCompetitions();
    
        if (Array.isArray(data)) {
            const grouped: Record<number, Competition> = {};
    
            data.forEach(row => {
                const compId = row.cid;
    
                if (!grouped[compId]) {
                    grouped[compId] = {
                        id: compId,
                        league: row.name,
                        round: row.round,
                        locations: []
                    };
                }
    
                grouped[compId].locations.push({
                    id: row.clid,
                    group: row.group_name,
                    city: row.city,
                    date: row.date
                });
            });
    
            setCompetitions(Object.values(grouped));
        }
    };


    //Seach competition by id in fetched competitions
    const handleSearchCompetitionById = (idCompetition: number) => {
        if (Array.isArray(competitions)) 
            setEditingCompetition(competitions.find(competition => competition.id === idCompetition));

        console.log(`🟢 Upravujem súťaž: ${JSON.stringify(editingCompetition)}`);
    };

    // Open form UI
    const handleOpenFormUI = (idCompetition: number) => {
        if(idCompetition === 0)            
            setFormUiData({ state: true, formTitle: "Vytvoriť novú súťaž"});
        else {
            console.log("Upraviť súťaž");            
            handleSearchCompetitionById(idCompetition);
            setFormUiData({ state: true, formTitle: "Upraviť súťaž"});
        }
    };
    useEffect(() => {
        console.log(`Sutaze: ${JSON.stringify(competitions)}`);
    }, [competitions]);
    useEffect(() => {
        fetchCompetitions();
    }, []);
    
    return (
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Súťaže SZV</h1>
            </div>
            {Array.isArray(competitions) && competitions.length > 0 ? (
                competitions.map(competition => (
                    <ContentBlock 
                        key={competition.id}
                        headerTitle={`${competition.round.toString()}. kolo - ${competition.league}`}
                        locations={competition.locations}
                    />
                ))
            ) : (
                <ContentBlock headerTitle="Neni súťaž" />
            )}
        </article>
    );
    
};

export default TheCompetitions;