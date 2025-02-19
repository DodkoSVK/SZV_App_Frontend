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

// Component
const TheClubs: React.FC = () => {
    //useStates
    const [clubs, setClubs] = useState<Club[] | { message: string }>( { message: "Načítavam kluby..." });
    const [editingClub, setEditingClub] = useState<Club>();
    const [formUI, setFormUI] = useState<FormUI | null>(null);    
    const [alert, setAlert] = useState<Alert | null>(null);

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
            setFormUI({ state: false }); 
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
            setFormUI({ state: false });
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
        setFormUI({ state: false });

        
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
    useEffect(() => {   
        fetchClubs();
    }, []);

    return(
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Športové kluby SZV</h1>
            </div>
            <ClubsTable 
                clubs={clubs} 
                sortBy={(key: string) => fetchSortedClubs(key)}
                uiHandler={(clubId: number) => handleOpenFormUI(clubId)}
            />
            { formUI?.state && (
                <ClubForm 
                    clubData={editingClub}
                    formTitle={formUI?.formTitle}   
                    closeCreateClubUI={() => setFormUI({ state: false })}
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