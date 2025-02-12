import { useState, useEffect } from 'react';
import axios from 'axios';
//Types
import { Club } from '../../assets/types/index';
//Components
//import SuccessAlert from '../components/alerts/SuccessAlert';
//import FailedAlert from '../components/alerts/FailedAlert';
//Childrens Components
import ClubsTable from '../clubs/ClubsTable';

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

    useEffect(() => {
        getClubs();
    }, []);

    return(
        <article>
            <div><h1>Tieto kluby mame</h1></div>
            <ClubsTable clubs={clubs} />
        </article>
    );
};

export default TheClubs;