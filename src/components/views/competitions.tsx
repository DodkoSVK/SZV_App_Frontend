import { useEffect, useState, MouseEvent } from "react";
//Methods
import { getCompetitions } from "../../apis/CompetitionApis";
//Types
import { Competition, defaultCompetition } from "../../assets/types/competitionTypes";
import { FormUI } from "../../assets/types/index";
//Children Components
import CompetitionForm from "../competitions/CompetitionForm";
import ContentBlock from "../contentBlock/ContentBlock";

const TheCompetitions: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[] | { message: string }>({ message: "Načítavam súťaže..." });    
    const [editingCompetition, setEditingCompetition] = useState<Competition>(defaultCompetition);
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
        if (idCompetition !== 0) {
            if (Array.isArray(competitions)) 
                setEditingCompetition(competitions.find(competition => competition.id === idCompetition) || defaultCompetition);
        }
           
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
    //Close Form UI
    const handleCloseFormUI = () => {
        setFormUiData({ state: false, formTitle: "" });
        setEditingCompetition(defaultCompetition);
    }
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
                <button onClick={() => setFormUiData({ state: true, formTitle: "Vytvorenie súťaže" })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

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
                    closeUI={() => handleCloseFormUI()}
                />
            )}
        </article>
    );
    
};

export default TheCompetitions;