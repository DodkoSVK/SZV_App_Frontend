import axios from "axios";
import { useEffect, useState } from "react";
//Types
import { Person } from "../../assets/types";
//Children Components
import PersonsTable from "../persons/PersonsTable";


//Component
const ThePersons: React.FC = () => {
    const [persons, setPersons] = useState<Person[] | { message: string }>({ message: "Načítavam osoby..." });

    const getPersons = async () => {
        axios.get('http://localhost:3002/api/person').then(response => {
            console.log(`🟡 Načítavam všetky osoby`);
            if(Array.isArray(response.data)){
                setPersons(response.data);
            } else {
                setPersons({ message: "Nenašli sa žiadne osoby"});
            }
        })
    };
    const getSortedPersons = async (key: string) => {
        console.log(`🟡 Filtrujem všetky kluby podľa: ${key}`);
        axios.get(`http://localhost:3002/api/person?sortBy=${key}`).then(response => {
            if(Array.isArray(response.data)){
                setPersons(response.data);
            } else {
                setPersons({ message: "Nenašli sa žiadne kluby"});
            }
        })
    };
    useEffect(() => {
        getPersons();
    }, [])
    return (
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Športovci SZV</h1>
            </div>
            <PersonsTable 
                persons={persons}
                sortBy={(key: string) => getSortedPersons(key)}
            />
        </article>
    )
};
export default ThePersons;