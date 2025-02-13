import { useState, useEffect } from 'react';
import axios from 'axios';
//Types
import { Club } from '../../assets/types/index';
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


    const handleCreateClub = () => {
        console.log("Vytvaram klub");
        //Tu otvor UI na vytvorenie klubu
    };

    useEffect(() => {   
        getClubs();
    }, []);

    return(
        <article>
            <div><h1>Tieto kluby mame</h1></div>
            <ClubsTable 
                clubs={clubs} 
                sortBy={(key: string) => getSortedClubs(key)}
                editClub={(id: number) => getClubByID(id)}
                createClub={() => handleCreateClub()}
            />
            <ClubCreateForm />
        </article>
    );
};

export default TheClubs;