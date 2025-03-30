import { useEffect, useState, MouseEvent } from "react";
//Methods
import { getCompetitions } from "../../apis/CompetitionApis";
//Types
import { Competition } from "../../assets/types/competitionTypes";
import { FormUI } from "../../assets/types/index";
//Children Components
import CompetitionForm from "../competitions/CompetitionForm";
import ContentBlock from "../contentBlock/ContentBlock";

const TheCompetitions: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[] | { message: string }>({ message: "Načítavam súťaže..." });    
    const [editingCompetition, setEditingCompetition] = useState<Competition>();
    const [formUiData, setFormUiData] = useState<FormUI>();

    // Fetching all competitions    
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
    };

    // Open form UI
    const handleOpenFormUI = (type: boolean, id: number, e: MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget.name;
        console.log(`ID: ${id}, button: ${button}, type: ${type}`)
        if(type) {
            console.log(`Idem robit operaciu so skupinou: ${id}`)
            if(button === "create") {
                console.log(`Ideme vytvorit novu skupinu pre sutaz: ${id}`)
                
            }
            if(button === "edit") {
                console.log(`Ideme upravit sutaz: ${id}`)
                handleSearchCompetitionById(id);
                setFormUiData({
                    state: true,
                    formTitle: "Úprava súťaže"
                })               
            }
            
        } else {
            console.log(`Idem robit operaciu so sutazou ${id}`)
        }       
    };
    useEffect(() => {        
        console.log(`🟢 Upravujem súťaž: ${JSON.stringify(editingCompetition)}`);
    }, [editingCompetition])
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
                        competitionID={competition.id}
                        locations={competition.locations}
                        handleClickButton={handleOpenFormUI}
                    />
                ))
            ) : (
                <ContentBlock 
                    headerTitle="Neni súťaž" />
            )}
            { formUiData?.state && (
                <CompetitionForm 
                    formTitle={formUiData.formTitle}
                    competitionData={editingCompetition}
                />
            )}
        </article>
    );
    
};

export default TheCompetitions;