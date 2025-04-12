import { useState, useEffect } from 'react';
import { getClubs, getSortedClubs, createClub, editClub, deleteClub } from '../../apis/ClubApis';
//Types
import { Club, EditClub, CreateClub, defaultClub } from '../../assets/types/clubTypes';
import { FormUI, Alert} from '../../assets/types/index';
//Components
import SuccessAlert from '../../components/alerts/SuccessAlert';
import FailedAlert from '../../components/alerts/FailedAlert';
//Childrens Components
import ClubsTable from '../clubs/ClubsTable';
import ClubForm from '../clubs/ClubForm';

import ClubTableColumns from '../tables/ClubTableColumns';
import DataTable from '../tables/DataTable';
import { Button } from "@/components/ui/button"

// Component
const TheClubs: React.FC = () => {
    //useStates
    const [clubs, setClubs] = useState<Club[]>([]);
    const [editingClub, setEditingClub] = useState<Club>();
    const [formUI, setFormUI] = useState<FormUI | null>(null);    
    const [alert, setAlert] = useState<Alert | null>(null);
    const [selecting, setSelecting] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    

    // Fetching all clubs
    const fetchClubs = async () => {
        setClubs(await getClubs());
    }
    const fetchSortedClubs = async (key: string) => {
        setClubs(await getSortedClubs(key));
    }
    const submitClub = async (clubData: CreateClub) => {
        const submitStatus = await createClub(clubData);
        if (submitStatus === 1) {
            setAlert({
                alertType: true,
                alertMessage: "Klub bol úspešne vytvorený"
            });
            await fetchClubs();
            setFormUI({ state: false, formTitle: ""}); 
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
            setFormUI({ state: false, formTitle: "" });
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
    const removeClub = async (clubId: number) => {
        const removeStatus = await deleteClub(clubId);
        if ( removeStatus === 1) setAlert({ alertType: true, alertMessage: "Klub úspešne vymazaný." }); 
        else if ( removeStatus === 2) setAlert({ alertType: false, alertMessage: "Nepodarilo sa vymazať klub." });
        fetchClubs();
        setFormUI({ state: false, formTitle: "" });

        
    }
    /* const getClubByID = async (id: number) => {
        axios.get(`cd://app.vzpieranie.sk:3002/api/club/${id}`).then(response => {
            console.log(`🟡 Načítavam klub s ID: ${id}`);
            console.log(response.data[0]);
            setClub(response.data[0]);
        })
    }; */
    
    const findClubByID = (id: number) => {
        if (Array.isArray(clubs)) {
            setEditingClub(clubs.find(club => club.id === id) || defaultClub);
        }
    }

    const handleOpenFormUI = (clubId: number) => { 
        if(clubId === 0) setFormUI({ state: true, formTitle: "Vytvoriť nový klub" });                         
        if(clubId > 1) {
            findClubByID(clubId);            
            setFormUI({ state: true, formTitle: "Upraviť klub" }); 
        }            
    };  
    const handleCloseAlert = () => {
        setAlert(null);
    };

    const handleRowSelect = (ids: number[]) => {
        setSelectedIds(ids);
        setSelecting(ids.length > 0);
    }

    useEffect(() => {   
        fetchClubs();
    }, []);

    return(
        <article>
            <div className="flex flex-row justify-between mt-4 text-3xl mx-20 font-bold text-left text-[oklch(var(--foreground))] uppercase">
                <h1>Športové kluby SZV</h1>
                <div className="flex flex-row gap-2">   
                    { selecting && (
                        <>
                            <Button 
                                variant="red"
                                onClick={() => console.log("Delete")}
                            >
                                Vymazať
                            </Button>
                            <Button 
                                variant="orange"
                                onClick={() => console.log("Edit")}
                            >
                                Upraviť
                            </Button>
                        </>                                                
                    )}            
                    <Button 
                        variant="green"
                        onClick={() => handleOpenFormUI(0)}
                    >
                        Pridať
                    </Button>
                </div>                
            </div>
            <div className="mx-10">
                <DataTable                    
                    columns={ClubTableColumns}
                    data={clubs}
                    onRowSelect={handleRowSelect}
                />
            </div>

            {/* <ClubsTable 
                clubs={clubs} 
                sortBy={(key: string) => fetchSortedClubs(key)}
                uiHandler={(clubId: number) => handleOpenFormUI(clubId)}
            /> */}
            { formUI?.state && (
                <ClubForm 
                    clubData={editingClub}
                    formTitle={formUI?.formTitle}   
                    handleCloseUI={() => setFormUI({ state: false })}
                    handleCreateClub={(club: CreateClub) => submitClub(club)}
                    handleEditClub={(club: EditClub) => updateClub(club)} 
                    handleDeleteClub={(id: number) => removeClub(id)}                                 
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