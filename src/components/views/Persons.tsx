import axios from "axios";
import { useEffect, useState } from "react";
//Types
import { openEditCreateUI, Person } from "../../assets/types";
//Children Components
import PersonsTable from "../persons/PersonsTable";
import PersonForm from "../persons/PersonForm";


//Component
const ThePersons: React.FC = () => {
    //useStates
    const [persons, setPersons] = useState<Person[] | { message: string }>({ message: "Načítavam osoby..." });
    const [renderFormUi, setRenderFormUi] = useState<boolean | null>(null);
    const [formUi, setFormUi] = useState<openEditCreateUI>();

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

    const handleOpenFormUI = (formUiData: openEditCreateUI) => {
        setFormUi(formUiData);
        setRenderFormUi(true);
    }
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
                uiHandler={(data: openEditCreateUI)=> handleOpenFormUI(data)}
            />
            

        </article>
    )
};
export default ThePersons;