// React, Methods
import { useEffect, useState, useCallback} from "react";
import { getCompetitions, createCompetition, editCompetition } from "../../apis/CompetitionApis";
//Types
import { Competition, CreateCompetition, EditCompetition } from "../../assets/types/competitionTypes";
//Children Components
import { Button } from "@/components/ui/button"
import CompetitionsBlock from "../competitions/CompetitionsBlock";
import CompetitionForm from "../forms/CompetitionForm";
import { Alert } from "@/assets/types";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import FailedAlert from "@/components/alerts/FailedAlert";

const TheCompetitions: React.FC = () => {
    // useStates
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [editingCompetition, setEditingCompetition] = useState<Competition[]>([]);
    const [formUI, setFormUI] = useState<boolean>(false);
    const [alert, setAlert] = useState<Alert | null>(null);
    const [selecting, setSelecting] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [clearSelectCompetitions, setClearSelectCompetitions] = useState(false);
    // Fetching all competitions    
    const fetchCompetitions = async () => {
        try {
            const data = await getCompetitions();
            if (Array.isArray(data))
                setCompetitions(data);

        } catch (e) {
            const error = 3001;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    }            
    // Create a new Competition
    const submitCompetition = async (competitionData: CreateCompetition) => {
        try {
            const submitStatus = await createCompetition(competitionData);
            if(submitStatus === 1 ) {
                setAlert({
                    alertType: true,
                    alertMessage: "Osoba bola úspešne vytvorená"
                });
                await fetchCompetitions();
                setFormUI(false);
            } else if (submitStatus === 2 ) {
                setAlert({
                    alertType: false,
                    alertMessage: "Nesprávna požiadavka"
                });
            } else if (submitStatus === 3) {
                setAlert({
                    alertType: false,
                    alertMessage: "Chyba pri spracovaní požiadavky"
                });
            }     
        } catch (e) {
            const error = 3002;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    }
    // Edit an a existing competitions
    const updateCompetition = async (competitionData: EditCompetition) => {
        try {
            const updateStatus = await editCompetition(competitionData);
            if (updateStatus === 1 ) {
                setAlert({
                    alertType: true,
                    alertMessage: "Osoba bola úspešne upravená"
                });
                await fetchCompetitions();
            } else if (updateStatus === 2 ) {
                setAlert({
                    alertType: false,
                    alertMessage: "Nesprávna požiadavka"
                }) 
            } else if (updateStatus === 3) {
                setAlert({
                    alertType: false,
                    alertMessage: "Chyba pri spracovaní požiadavky"
                });
            }
        } catch (e) {
            const error = 3003;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    }
    // Method for handler after competition check
    const handleCompetitionCheck = useCallback((ids: number[]) => {
        setSelectedIds(ids);
        setSelecting(ids.length > 0);
    }, []);

    // Method for un-check all competitions
    const handleClearSelection = () => {
        setSelectedIds([]);
        setSelecting(false);
        setClearSelectCompetitions(true);
    };
    // Open form UI after clicking to button
    const handleOpenFormUI = () => {
        try {
            if(selectedIds.length === 0) {
                setFormUI(true);
            } else {
                searchCompetitionByID(selectedIds);
                setFormUI(true);
            }
        } catch (e) {
            const error = 3007;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }     
    };
    // Close form UI, -> Reload competitions -> Close FormUI -> Turn OFF selecting -> Reset selecting ID and competition(s)-> Deselect competition(s)
    const handleCloseFormUI = () => {        
        fetchCompetitions();
        setFormUI(false);        
        setEditingCompetition([]);
        handleClearSelection();
    };
     // Find competitions by ID in fetched competitions and stored in component useState
    const searchCompetitionByID = (ids: number[]) => {
        try {
            if(Array.isArray(competitions) && Array.isArray(ids)) {
                const foundCompetitions = competitions.filter(competition => ids.includes(competition.id));
                setEditingCompetition(foundCompetitions);
            }
        } catch (e) {
            const error = 3008;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }       
    };

    // Method for closing alert, if user is faster than countdown
    const handleCloseAlert = () => {
        try {
            setAlert(null);
        } catch (e) {
            const error = 2005;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
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
                                onClick={() => handleOpenFormUI()}
                            >
                                Upraviť
                            </Button>
                        </>
                    )}
                    <Button
                        variant="green"
                        onClick={() => handleOpenFormUI()}
                    >
                        Vytvorit
                    </Button>
                </div>
            </div>
            <CompetitionsBlock                
                competitions={competitions}
                selectingCompetitions={(ids: number[]) => handleCompetitionCheck(ids)}
                clearSelectCompetitions={clearSelectCompetitions}
            />
            { formUI && (
                <CompetitionForm 
                    competitionData={editingCompetition}
                    handleCloseUI={handleCloseFormUI}
                    onCreate={submitCompetition}
                    onEdit={updateCompetition}
                />
            )}
            {alert?.alertType === true && (
                <SuccessAlert  
                    alertMessage={alert.alertMessage}
                    closeRequest={handleCloseAlert}
                />
            )}
            {alert?.alertType === false && (
                <FailedAlert
                    alertMessage={alert.alertMessage}
                    closeRequest={handleCloseAlert}
                />
            )}
        </article>
    );
    
};

export default TheCompetitions;