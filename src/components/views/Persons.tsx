import { useEffect, useState } from "react";
import { getPersons, getSortedPersons, createPerson } from "../../apis/PersonApis";
//Types
import { CreatePerson, Person, defaultPerson } from "../../assets/types/personTypes";
//Children Components
import PersonsTable from "../persons/PersonsTable";
import PersonForm from "../persons/PersonForm";
import { FormUI, Alert } from "../../assets/types";


//Component
const ThePersons: React.FC = () => {
    //useStates
    const [persons, setPersons] = useState<Person[] | { message: string }>({ message: "Načítavam osoby..." });
    const [editingPerson, setEditingPerson] = useState<Person>();
    const [formUI, setFormUI] = useState<FormUI | null>(null);
    const [alert, setAlert] = useState<Alert | null>(null);

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
    const handleSubmitPerson = async (personData: CreatePerson) => {
        const submitStatus = await createPerson(personData);
        if (submitStatus === 1) {
            setAlert({
                alertType: true,
                alertMessage: "Osoba bola úspešne vytvorená"
            });
            await fetchPersons();
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
    }
    const handleOpenFormUi = (personId: number) => {
        if(personId === 0) setFormUI({ state: true, formTitle: "Vytvoriť novú osobu" });  
        else if(personId > 0) {
            findPersonByID(personId);            
            setFormUI({ state: true, formTitle: "Upraviť osobu" }); 
        }          
    };
    
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
                sortBy={fetchSortedPersons}
                uiHandler={handleOpenFormUi}
            />    
            { formUI?.state && (
                <PersonForm 
                    formTitle={formUI?.formTitle}
                    personData={editingPerson}
                    handleCloseUI={() => setFormUI({ state: false})}
                    handleCreatePerson={handleSubmitPerson}
                />
            )}      
        </article>
    )
};
export default ThePersons;