import { useState, useEffect } from 'react';
import axios from 'axios';
//Types

//Components
import SuccessAlert from '../components/alerts/SuccessAlert';
import FailedAlert from '../components/alerts/FailedAlert';
//Childrens Components


// Component
const TheClubs: React.FC = () => {
    //useStates
    const [clubs, setClubs] = useState<Clubs[] | { message: string}>({ message: "Načítavam kluby..."});

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
    return(
        <article>
            
        </article>
    );
};

export default TheClubs;