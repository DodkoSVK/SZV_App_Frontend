import { useState, useEffect } from 'react';
import axios from 'axios';
//Types
import { Club, defaultClub, CreateClub, openEditCreateUI, Alert, EditClub } from '../../assets/types/index';
//Components
import SuccessAlert from '../../components/alerts/SuccessAlert';
import FailedAlert from '../../components/alerts/FailedAlert';
//Childrens Components
import ClubsTable from '../clubs/ClubsTable';
import ClubCreateForm from '../clubs/ClubCreateForm';

// Component
const TheClubs: React.FC = () => {
    //useStates
    const [clubs, setClubs] = useState<Club[] | { message: string }>({ message: "Načítavam kluby..." });
    const [club, setClub] = useState<Club>(defaultClub);
    const [ClubUI, setClubUI] = useState<openEditCreateUI>();
    const [renderClubUI, setRenderClubUI] = useState<boolean | null>(null);    
    const [alert, setAlert] = useState<Alert | null>(null);

    //Getting clubs from DB
    const getClubs = async () => {
        axios.get('htpps://app.vzpieranie.sk:3002/api/club').then(response => {
            console.log(`🟡 Načítavam všetky kluby`);
            if(Array.isArray(response.data)){
                setClubs(response.data);
            } else {
                setClubs({ message: "Nenašli sa žiadne kluby"});
            }
        })
    };
    const getClubByID = async (id: number) => {
        axios.get(`htpps://app.vzpieranie.sk:3002/api/club/${id}`).then(response => {
            console.log(`🟡 Načítavam klub s ID: ${id}`);
            console.log(response.data[0]);
            setClub(response.data[0]);
        })
    };
    const getSortedClubs = async (key: string) => {
        console.log(`🟡 Filtrujem všetky kluby podľa: ${key}`);
        axios.get(`htpps://app.vzpieranie.sk:3002/api/club?sortBy=${key}`).then(response => {
            if(Array.isArray(response.data)){
                setClubs(response.data);
            } else {
                setClubs({ message: "Nenašli sa žiadne kluby"});
            }
        })
    };
    const createClub = async (club: CreateClub) => {
        console.log("🟡 Vytváram klub s týmito údajmi: ", club);
        axios.post('htpps://app.vzpieranie.sk:3002/api/club', club).then(async response => {            
            const code = response.status;            
            if (code >= 200 && code < 300) {                
                setAlert({
                    alertType: true,
                    alertMessage: "Klub bol úspešne vytvorený"
                });
                await getClubs();
                setRenderClubUI(false);
            }            
        }).catch(error => {
            const code = error.status;            
            console.log(`🔴 Chyba pri vytváraní klubu: ${code}`);
            if(code >= 400 && code < 500)
                setAlert({
                    alertType: false,
                    alertMessage: "Nesprávna požiadavka"
                })                           
            if(code >= 500)
                setAlert({
                    alertType: false,
                    alertMessage: "Chyba pri spracovaní požiadavky"
                });             
        });
    };
    const editClub = async (club: EditClub) => {
        console.log(`🟡 Editujem klub: ${club.name}`);
        axios.patch(`htpps://app.vzpieranie.sk:3002/api/club/${club.id}`, club).then(async response => {
            const code = response.status;
            if(code === 201) {
                setAlert({
                    alertType: true,
                    alertMessage: "Klub bol úspešne upravený"
                });
                await getClubs();
                setRenderClubUI(false);
            }            
        }).catch(error => {
            const code = error.status;            
            console.log(`🔴 Chyba pri vytváraní klubu: ${code}`);
            if(code >= 400 && code < 500)
                setAlert({
                    alertType: false,
                    alertMessage: "Nesprávna požiadavka"
                })                           
            if(code >= 500)
                setAlert({
                    alertType: false,
                    alertMessage: "Chyba pri spracovaní požiadavky"
                });  
        });                
    };
    const deleteClub = async (id: number) => {
        console.log(`🟡 Mažem klub s ID: ${id}`);
        axios.delete(`htpps://app.vzpieranie.sk:3002/api/club/${id}`).then(response => {
            const code = response.status;
            if(code === 200) {                
                setAlert({
                    alertType: true,
                    alertMessage: "Klub úspešne vymazaný."
                });
            }
            if(code === 500) 
                setAlert({
                    alertType: false,
                    alertMessage: "Nepodarilo sa vymazať klub"
                    
                })
        });
        getClubs();
        setRenderClubUI(false);        
    };
   

    const handleOpenCreateEditUI = (uiData: openEditCreateUI) => {        
        setClubUI(uiData);
        if(uiData.id === 0){
            setClub(Object.assign({}, defaultClub));
            setRenderClubUI(true); 
        }                
        if(uiData?.id > 1) {
            getClubByID(uiData.id);
            setRenderClubUI(true); 
        }
            
    };  
    const handleCloseAlert = () => {
        setAlert(null);
    };
    useEffect(() => {   
        getClubs();
    }, []);

    return(
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Športové kluby SZV</h1>
            </div>
            <ClubsTable 
                clubs={clubs} 
                sortBy={(key: string) => getSortedClubs(key)}
                uiHandler={ (data: openEditCreateUI) => handleOpenCreateEditUI(data)}
            />
            { renderClubUI && (
                <ClubCreateForm 
                    closeCreateClubUI={() => setRenderClubUI(false)}
                    handleCreateClub={(club: CreateClub) => createClub(club)}
                    handleEditClub={(club: EditClub) => editClub(club)} 
                    handleDeleteClub={(id: number) => deleteClub(id)}
                    clubData={club}
                    formTitle={ClubUI?.message || ""}                
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