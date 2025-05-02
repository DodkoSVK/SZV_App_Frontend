// React, Methods
import { useState, useEffect, useRef } from 'react';
import { getClubs, createClub, editClub, deleteClub } from '@/apis/ClubApis';
// Types
import { Club, EditClub, CreateClub } from '@/assets/types/clubTypes';
import { Alert} from '@/assets/types/index';
//Children Components
import SuccessAlert from '@/components/alerts/SuccessAlert';
import FailedAlert from '@/components/alerts/FailedAlert';
import ClubTableColumns from '@/components/clubs/ClubTableColumns';
import DataTable from '@/components/tables/DataTable';
import ClubForm from '@/components/forms/ClubForm';
// ShadUi Components
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
// Component
const TheClubs: React.FC = () => {
    // useStates
    const [clubs, setClubs] = useState<Club[]>([]); // Fetched clubs from DB
    const [editingClub, setEditingClub] = useState<Club[]>([]); // Array of selected clubs to edit
    const [formUI, setFormUI] = useState<boolean>(false); // State to show Club form UI
    const [alert, setAlert] = useState<Alert | null>(null); // State to show alert message
    const [selecting, setSelecting] = useState<boolean>(false); // True -> user selecting club(s)
    const [selectedIds, setSelectedIds] = useState<number[]>([]); // Selected ID(s) club(s)
    // useRefs 
    const tableRef = useRef<Table<Club> | null>(null); // To clubs table for deselect row(s)
    // Fetching all clubs
    const fetchClubs = async () => {
        const results = await getClubs();
        if(Array.isArray(results))
            setClubs(results);
    }    
    // Creating a new Club 
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
    // Updating an a existing club
    const updateClub = async (clubData: EditClub) => {
        const updateStatus = await editClub(clubData);
        if (updateStatus === 1 ) {
            setAlert({
                alertType: true,
                alertMessage: "Klub bol úspešne upravený"
            });
            await fetchClubs();
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
    // Remove an a existing club
    const removeClub = async () => {
        let howMuch = 0;
        for (const selectedId of selectedIds) {
            const removeStatus = await deleteClub(selectedId);
            if ( removeStatus === 2) {
                setAlert({ alertType: false, alertMessage: "Nepodarilo sa vymazať klub." });
                break;
            } 
            howMuch++;
        }
        if( howMuch > 1)
            setAlert({ alertType: true, alertMessage: `Bolo úspešne vymazaných ${howMuch} klubov.` });
        else
            setAlert({ alertType: true, alertMessage: "Klub úspešne vymazaný." }); 
        
        await fetchClubs();       
        handleCloseFormUI();        
    } 
    // Method for closing alert, if user is faster than countdown
    const handleCloseAlert = () => {
        setAlert(null);
    };

    // Insert selected club(s) ID(s) from DataTable to useState
    const handleRowSelect = (ids: number[]) => {
        if (JSON.stringify(ids) !== JSON.stringify(selectedIds)) {
            setSelectedIds(ids);
            setSelecting(ids.length > 0);
        }
    }   
    // Oper formUI after clicking to button
    const handleOpenFormUI = () => { 
        if(selectedIds.length === 0) {
            setFormUI(true);    
        } else {
            findClubByID(selectedIds);            
            setFormUI(true);
        }                     
    };  
    // Close form UI, -> Reload clubs -> Close FormUI -> Turn OFF selecting -> Reset selecting ID and clubs -> Deselect table row(s)
    const handleCloseFormUI = () => {
        fetchClubs();
        setFormUI(false);
        setSelecting(false);
        setSelectedIds([]);
        setEditingClub([]);
        tableRef.current?.resetRowSelection();
    }
     // Find person by ID in fetched clubs and stored in component useState
    const findClubByID = (ids: number[]) => {
        if (Array.isArray(clubs) && Array.isArray(ids)) {
            const foundClubs = clubs.filter(club => ids.includes(club.id));
            //console.log(`Found clubs ${JSON.stringify(foundClubs)}`);
            setEditingClub(foundClubs);
        }
    }    
    // Fetch club(s) after load
    useEffect(() => {   
        fetchClubs();
    }, []);
    //Return component
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
                    columnFilterName="name"
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