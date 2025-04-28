// React, Methods
import { useEffect, useState, MouseEvent, useCallback } from "react";
import { getCompetitions, createCompetition } from "../../apis/CompetitionApis";
//Types
import { Competition, CompetitionLocation } from "../../assets/types/competitionTypes";
//Children Components






import { Button } from "@/components/ui/button"
import CompetitionsBlock from "../competitions/CompetitionsBlock";

const TheCompetitions: React.FC = () => {
    // useStates
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [editingCompetition, setEditingCompetition] = useState<Competition[]>([]);
    const [formUI, setFormUI] = useState<boolean>(false);
    const [selecting, setSelecting] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    // Fetching all competitions    
    const fetchCompetitions = async () => {
        const data = await getCompetitions();
        console.log("📦 Raw competitions:", data);
        if (Array.isArray(data)) {
            const comps: Competition[] = data.map(comp => ({
                id: comp.id,
                league: comp.league_name, 
                round: comp.round,
                date: comp.date,
                locations: comp.locations.map((loc: CompetitionLocation) => ({
                    id: loc.id,
                    group: loc.group,
                    city: loc.city,
                    club_name: loc.club_name
                }))
            }));
            console.log(`Competitions: ${JSON.stringify(comps)}`)
            setCompetitions(comps);
        }            
    }       
    // Find competitions by ID in fetched competitions and stored in component useState
    const findCompetitionByID = (ids: number[]) => {
        if(Array.isArray(competitions) && Array.isArray(ids)) {
            const foundCompetitions = competitions.filter(competition => ids.includes(competition.id));
            setEditingCompetition(foundCompetitions);
        }
    };
    // Method for handler after competition check
    const handleCompetitionCheck = useCallback((ids: number[]) => {
        setSelectedIds(ids);
        setSelecting(ids.length > 0);
    }, []);
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
    }

    const handleCreateCompetition = (competition: Competition) => {
        console.log(`Vytvorenie sutaze: ${JSON.stringify(competition)}`); 
        createCompetition(competition);

    }
    const handleUpdateCompetition = (competition: Competition) => {
        console.log(`Upravenie sutaze: ${JSON.stringify(competition)}`); 
    }
    const handleDeleteCompetition = (competitionID: number) => { 
        console.log(`Zmazanie sutaze: ${JSON.stringify(competitionID)}`); 
    }


    useEffect(() => {        
        console.log(`🟢 Upravujem súťaž: ${JSON.stringify(selectedIds)}`);
    }, [selectedIds])
    useEffect(() => {
        console.log(`Sutaze: ${JSON.stringify(competitions)}`);
    }, [competitions]);
    useEffect(() => {
        fetchCompetitions();
    }, []);
    
    return (
        <article>  
            <div className="flex flex-row justify-between mt-4 mb-4 text-3xl mx-20 font-bold text-left text-[oklch(var(--foreground))] uppercase">
                <h1>Súťaže</h1>
                <div className="flex flex-row gap-2">
                    { selecting && (
                        <>
                            <Button
                                variant="red"
                                onClick={() => console.log("Mazem sutaz")}
                            >
                                Vymazať
                            </Button>
                            <Button
                                variant="orange"
                                onClick={() => console.log("Upravujem sutaz")}
                            >
                                Upraviť
                            </Button>
                        </>
                    )}
                    <Button
                        variant="green"
                        onClick={() => console.log("Vytvaram sutaz")}
                    >
                        Vytvorit
                    </Button>
                </div>
            </div>
            <CompetitionsBlock
                competitions={competitions}
                selectingCompetitions={(ids: number[]) => handleCompetitionCheck(ids)}
            />


         
        </article>
    );
    
};

export default TheCompetitions;