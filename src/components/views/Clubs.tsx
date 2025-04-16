import { useState, useEffect, useRef } from 'react';
import { getClubs, createClub, editClub, deleteClub } from '../../apis/ClubApis';
//Types
import { Club, EditClub, CreateClub } from '../../assets/types/clubTypes';
import { FormUI, Alert} from '../../assets/types/index';
//Components
import SuccessAlert from '../../components/alerts/SuccessAlert';
import FailedAlert from '../../components/alerts/FailedAlert';


import ClubTableColumns from '../tables/ClubTableColumns';
import DataTable from '../tables/DataTable';
import { Button } from "@/components/ui/button";
import ClubForm from '../forms/ClubForm';

// Component
const TheClubs: React.FC = () => {
    //useStates
    const [clubs, setClubs] = useState<Club[]>([]);
    const [editingClub, setEditingClub] = useState<Club[]>([]);
    const [formUI, setFormUI] = useState<boolean>(false);    
    const [alert, setAlert] = useState<Alert | null>(null);
    const [selecting, setSelecting] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    
    const tableRef = useRef<any>(null);


    
    // Fetching all clubs
    const fetchClubs = async () => {
        const results = await getClubs();
        if(Array.isArray(results))
            setClubs(results);
    }    
    const submitClub = async (clubData: CreateClub) => {
        const submitStatus = await createClub(clubData);
        if (submitStatus === 1) {
            setAlert({
                alertType: true,
                alertMessage: "Klub bol úspešne vytvorený"
            });
            await fetchClubs();
            setFormUI(false); 
        } else if (submitStatus === 2) {
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
    };
    const updateClub = async (clubData: EditClub) => {
        const updateStatus = await editClub(clubData);
        if (updateStatus === 1 ) {
            setAlert({
                alertType: true,
                alertMessage: "Klub bol úspešne upravený"
            });
            await getClubs();
            //setFormUI({ state: false, formTitle: "" });
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
    }
    const removeClub = async () => {
        let howmuch = 0;
        for (const selectedId of selectedIds) {
            const removeStatus = await deleteClub(selectedId);
            if ( removeStatus === 2) {
                setAlert({ alertType: false, alertMessage: "Nepodarilo sa vymazať klub." });
                break;
            } 
            howmuch++;
        }
        if( howmuch > 1)
            setAlert({ alertType: true, alertMessage: `Bolo úspešne vymazaných ${howmuch} klubov.` });
        else
            setAlert({ alertType: true, alertMessage: "Klub úspešne vymazaný." }); 
        
        getClubs();       
        handleCloseFormUI();        
    } 
    
    const handleCloseAlert = () => {
        setAlert(null);
    };


    // Handle selecting row(s) - DONE
    const handleRowSelect = (ids: number[]) => {
        setSelectedIds(ids);
        setSelecting(ids.length > 0);
    }
    // Handle De-Selecting row(s) - DONE
    const handleRowDeSelect = () => {
        setSelectedIds([]);
        setSelecting(false);

    }
    // Handle open Form UI
    const handleOpenFormUI = () => { 
        if(selectedIds.length === 0) {
            setFormUI(true);    
        } else {
            findClubByID(selectedIds);            
            setFormUI(true);
        }                     
    };  
    //Find Club(s) in fetched clubs  - DONE
    const findClubByID = (ids: number[]) => {
        if (Array.isArray(clubs) && Array.isArray(ids)) {
            const foundClubs = clubs.filter(club => ids.includes(club.id));
            console.log(`Found clubs ${JSON.stringify(foundClubs)}`);
            setEditingClub(foundClubs);
        }
    }
    //Handle close Form UI  - DONE
    const handleCloseFormUI = () => {
        fetchClubs();
        setFormUI(false);
        setSelecting(false);
        setSelectedIds([]);
        setEditingClub([]);
        tableRef.current?.resetRowSelection();
    }

    useEffect(() => {   
        fetchClubs();
    }, []);

    //DEBUG ONLY ********************************** DEBUG ONLY **********************************

    useEffect(() => {
        console.log(`Clubs to update: ${editingClub}`)
    }, [editingClub])

    //DEBUG ONLY ********************************** DEBUG ONLY **********************************

    return(
        <article>
            <div className="flex flex-row justify-between mt-4 text-3xl mx-20 font-bold text-left text-[oklch(var(--foreground))] uppercase">
                <h1>Športové kluby SZV</h1>
                <div className="flex flex-row gap-2">   
                    { selecting && (
                        <>
                            <Button 
                                variant="red"
                                onClick={() => removeClub()}
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
                        Pridať
                    </Button>
                </div>                
            </div>
            <div className="mx-10">
                <DataTable                    
                    columns={ClubTableColumns}
                    data={Array.isArray(clubs) ? clubs : []}                   
                    onRowSelect={handleRowSelect}
                    tableRef={tableRef}
                />
            </div>        
            { formUI && (
                <ClubForm                    
                    clubData={editingClub}
                    handleCloseUI={handleCloseFormUI}
                    onCreate={submitClub}
                    onEdit={updateClub}
                />
            )}            
            { alert?.alertType === true && (
                <SuccessAlert 
                    alertMessage={alert.alertMessage}
                    closeRequest={() => handleCloseAlert()}
                />
            )}
            { alert?.alertType === false && (
                <FailedAlert 
                    alertMessage={alert.alertMessage}
                    closeRequest={() => handleCloseAlert()}
                />
            )}
        </article>
    );
};

export default TheClubs;