import { useEffect, useState } from "react";
import { getPersons, getSortedPersons } from "../../apis/PersonApis";
//Types
import { Person, defaultPerson } from "../../assets/types/personTypes";
//Children Components
import PersonsTable from "../persons/PersonsTable";
//import { FormUI } from "../../assets/types";


//Component
const ThePersons: React.FC = () => {
    //useStates
    const [persons, setPersons] = useState<Person[] | { message: string }>({ message: "Načítavam osoby..." });
    const [editingPerson, setEditingPerson] = useState<Person>();
    //const [formUI, setFormUI] = useState<FormUI | null>(null);

    const fetchPersons = async () => {
        setPersons(await getPersons());
    }    
    const fetchSortedPersons = async (key: string) => {
        setPersons(await getSortedPersons(key));
    }

    const findPersonByID = (id: number) => {
        if (Array.isArray(persons)) {
            setEditingPerson(persons.find(person => person.id === id) || defaultPerson);
        }
    }
    const handleFormUi = (personId: number) => {
        //if(personId === 0) setFormUI({ state: true, formTitle: "Vytvoriť novú osobu" });  
        if(personId > 1) {
            findPersonByID(personId);            
            //setFormUI({ state: true, formTitle: "Upraviť osobu" }); 
        }  
        console.log(`Editing person: ${editingPerson}`);
    }
    useEffect(() => {
        fetchPersons();
    }, [])
    return (
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Športovci SZV</h1>
            </div>
            <PersonsTable 
                persons={persons}
                sortBy={(key: string) => fetchSortedPersons(key)}
                uiHandler={(personId: number)=> handleFormUi(personId)}
            />          
        </article>
    )
};
export default ThePersons;