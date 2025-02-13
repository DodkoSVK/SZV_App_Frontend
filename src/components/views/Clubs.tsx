import { useState, useEffect } from 'react';
import axios from 'axios';
//Types
import { Club, CreateClub } from '../../assets/types/index';
//Components
//import SuccessAlert from '../components/alerts/SuccessAlert';
//import FailedAlert from '../components/alerts/FailedAlert';
//Childrens Components
import ClubsTable from '../clubs/ClubsTable';
import ClubCreateForm from '../clubs/ClubCreateForm';

// Component
const TheClubs: React.FC = () => {
    //useStates
    const [clubs, setClubs] = useState<Club[] | { message: string }>({ message: "Načítavam kluby..." });
    const [createClubUI, setCreateClubUI] = useState<boolean>(false);

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
    const createClub = async (club : CreateClub) => {
        console.log("Vytváram klub s týmito údajmi: ", club);
    };

    const openCreateClubUI = () => {
        console.log("Vytvaram klub");
        setCreateClubUI(true); //Tu otvor UI na vytvorenie klubu
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
                editClub={(id: number) => getClubByID(id)}
                createClub={() => openCreateClubUI()}
            />
            { createClubUI === true && createClubUI && (
                <ClubCreateForm 
                    closeCreateClubUI={() => setCreateClubUI(false)}
                    handleCreateClub={(club: CreateClub) => createClub(club)}                    
                />
            )}
        </article>
    );
};

export default TheClubs;