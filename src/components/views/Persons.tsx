import { useEffect, useState, FormEvent, MouseEvent } from "react";
import { getPersons, getSortedPersons } from "../../apis/PersonApis";
//Types
import { Person, defaultPerson } from "../../assets/types/personTypes";
//Children Components
import PersonsTable from "../persons/PersonsTable";
import PersonForm from "../persons/PersonForm";
import { FormUI } from "../../assets/types";


//Component
const ThePersons: React.FC = () => {
    //useStates
    const [persons, setPersons] = useState<Person[] | { message: string }>({ message: "Načítavam osoby..." });
    const [editingPerson, setEditingPerson] = useState<Person>();
    const [formUI, setFormUI] = useState<FormUI | null>(null);

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
    const handleOpenFormUi = (personId: number) => {
        if(personId === 0) setFormUI({ state: true, formTitle: "Vytvoriť novú osobu" });  
        if(personId > 1) {
            findPersonByID(personId);            
            setFormUI({ state: true, formTitle: "Upraviť osobu" }); 
        }  
        console.log(`Editing person: ${editingPerson}`);
    };
     const handleCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();        
            console.log("Ruším vytvorenie klubu");
            //props.closeCreateClubUI();
    };
    useEffect(() => {
        fetchPersons();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCancelButton(event as unknown as MouseEvent<HTMLButtonElement>);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [])
    return (
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Športovci SZV</h1>
            </div>
            <PersonsTable 
                persons={persons}
                sortBy={(key: string) => fetchSortedPersons(key)}
                uiHandler={(personId: number)=> handleOpenFormUi(personId)}
            />    
            { formUI?.state && (
                <PersonForm 
                    formTitle={formUI?.formTitle}
                />
            )}      
        </article>
    )
};
export default ThePersons;