import { useState, useEffect } from 'react';
import axios from 'axios';
//Types
import { Club, CreateClub, openEditCreateUI } from '../../assets/types/index';
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
    const [ClubUI, setClubUI] = useState<openEditCreateUI>();
    const [renderClubUI, setRenderClubUI] = useState<boolean | null>(null);
    const [alert, setAlert] = useState<boolean | null>(null);
    const [alertMessage, setAlertMessage] = useState<string>("");

    //Getting clubs from DB
    const getClubs = async () => {
        axios.get('http://localhost:3002/api/club').then(response => {
            console.log(response.data);
            if(Array.isArray(response.data)){
                setClubs(response.data);
            } else {
                setClubs({ message: "Nenašli sa žiadne kluby"});
            }
        })
    };
    const getClubByID = async (id: number) => {
        axios.get(`http://localhost:3002/api/club/${id}`).then(response => {
            console.log(response.data);
        })
    };
    const getSortedClubs = async (key: string) => {
        console.log(`Sortujem kluby podla ${key}`);
        axios.get(`http://localhost:3002/api/club?sortBy=${key}`).then(response => {
            console.log(response.data);
        })
    };
    const createClub = async (club: CreateClub) => {
        console.log("Vytváram klub s týmito údajmi: ", club);
        let code;
        axios.post('http://localhost:3002/api/club', club).then(response => {
            console.log(response.request);
            code = response.status;
            console.log(`Code: ${code}`);
            if (code >= 200 && code < 300) {
                setRenderClubUI(false);
                setAlertMessage("Klub bol úspešne vytvorený");
                setAlert(true);
            }
            getClubs();
        }).catch(error => {
            code = error.status;            
            console.log(`Chyba pri vytváraní klubu: ${code}`);
            if(code >= 400 && code < 500){
                setAlertMessage("Nesprávna požiadavka");               
            }
            if(code >= 500){
                setAlertMessage("Chyba pri spracovaní požiadavky");
            }
            setRenderClubUI(false);
            setAlert(false);
        });
    };

    const handleOpenCreateEditUI = (uiData: openEditCreateUI) => {        
        setClubUI(uiData);
        if(ClubUI?.id === 0)       
            setRenderClubUI(true); 
        if(ClubUI.id > 1)
            setRenderClubUI(false); 

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
                    formTitle={ClubUI?.message || ""}                
                />
            )}
            { alert === true && (
                <SuccessAlert 
                    alertMessage={alertMessage}
                    closeRequest={() => handleCloseAlert()}
                />
            )}
            { alert === false && (
                <FailedAlert 
                    alertMessage={alertMessage}
                    closeRequest={() => handleCloseAlert()}
                />
            )}
        </article>
    );
};

export default TheClubs;