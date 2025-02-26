import { useEffect, useState } from "react";
import { getPersons, getSortedPersons, createPerson } from "../../apis/PersonApis";
//Types
import { Person } from "../../assets/types/personTypes";
//Children Components
import PersonsTable from "../persons/PersonsTable";
import PersonForm from "../persons/PersonForm";
import { FormUI, Alert } from "../../assets/types";
import SuccessAlert from "../alerts/SuccessAlert";
import FailedAlert from "../alerts/FailedAlert";
//Component
const ThePersons: React.FC = () => {
    const [persons, setPersons] = useState<Person[] | {message: string}>();
    const [processPerson, setProcessPerson] = useState<Person>();
    const [formUiData, setFormUiData] = useState<FormUI>();
    const [alert, setAlert] = useState<Alert>();

    //Persons handlers
    const handleFetchAllPeoples = async () => {
        const results = await getPersons();
        console.log(`Results: ${JSON.stringify(results)}`);
        if (Array.isArray(results)) {
            setPersons(results);
            console.log(`Ludia: ${JSON.stringify(results)}`);
        } else {
            setPersons({message: results.message});
            console.log(`Ludia: ${JSON.stringify({message: results.message})}`);
        }
    };
    const handleFetchSortedPersons = async (key: string) => {
        setPersons(await getSortedPersons(key));
    };
    const handleSearchPersonById = (idPerson: number) => {
        if (Array.isArray(persons))
            setProcessPerson(persons.find(person => person.id === idPerson))
    };
    const handleCreatePerson = (person: Person) => {
        console.log(`Ta vyvaram personu: ${JSON.stringify(person)}`);
        setAlert({ alertType: true, alertMessage: "Osoba vytvorená"});
        handleCloseFormUI();
    }
    const handleUpdatePerson = (person: Person) => {
        console.log(`Ta vyvaram personu: ${JSON.stringify(person)}`);
        setAlert({ alertType: false, alertMessage: "Osoba upravená"});
        handleCloseFormUI();
    }
    const handleDeletePerson = (person: Person) => {
        console.log(`Ta vyvaram personu: ${JSON.stringify(person)}`);
        setAlert({ alertType: true, alertMessage: "Osoba vytvorená"});
        handleCloseFormUI();
    }
    //UI Handlers
    const handleOpenFormUI = (idPerson: number) => {
        if(idPerson === 0) 
            setFormUiData({state: true, formTitle: "Vytvoriť novú osobu"})
        else {
            setFormUiData({state: true, formTitle: "Upraviť osobu"})
            handleSearchPersonById(idPerson);
        }
    };
    const handleCloseFormUI = () => {
        setFormUiData({state: false, formTitle: ""})
        setProcessPerson(undefined);
    };
    const handleCloseAlert = () => {
        setAlert(undefined);
    }

    useEffect(() => {
        handleFetchAllPeoples();
    },[])

    return (
        <article>
            <div className="m-8 text-3xl font-bold text-center text-[#F7F9FB] uppercase">
                <h1>Športovci SZV</h1>
            </div>
            <PersonsTable 
                persons={persons}
                sortBy={handleFetchSortedPersons}
                formUiData={handleOpenFormUI}
            /> 
            { formUiData?.state && (
                <PersonForm 
                    formTitle={formUiData.formTitle}
                    closeUI={handleCloseFormUI}
                    personData={processPerson}
                    createPerson={handleCreatePerson}
                    updatePerson={handleUpdatePerson}
                    deletePerson={handleDeletePerson}
                />
            )}
            {alert ? (
                alert.alertType ? (
                    <SuccessAlert  
                        alertMessage={alert.alertMessage}
                        closeRequest={handleCloseAlert}
                    />
                ) : (
                    <FailedAlert
                        alertMessage={alert.alertMessage}
                        closeRequest={handleCloseAlert}
                    />
                )
            ) : null}
        </article>
    );    
};
export default ThePersons;