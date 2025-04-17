import { useEffect, useState } from "react";
import { getPersons, getSortedPersons, createPerson, updatePerson, deletePerson} from "../../apis/PersonApis";
//Types
import { Person, CreatePerson, EditPerson } from "../../assets/types/personTypes";
//Children Components
import PersonsTable from "../persons/PersonsTable";
import PersonForm from "../persons/PersonForm";
import { FormUI, Alert } from "../../assets/types/index";
import SuccessAlert from "../alerts/SuccessAlert";
import FailedAlert from "../alerts/FailedAlert";
import DataTable from "../tables/DataTable";
import PersonTableColumns from "../tables/PersonTableColumns";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
//Component
const ThePersons: React.FC = () => {
    const [ selecting, setSelecting ] = useState<boolean>(false);


    const [persons, setPersons] = useState<Person[] | {message: string}>({ message: ""});
    const [editingPerson, setEditingPerson] = useState<Person>();
    const [formUiData, setFormUiData] = useState<FormUI>();
    const [alert, setAlert] = useState<Alert>();

    //Persons handlers
    //Get all peoples
    const handleFetchAllPeoples = async () => {
        const results = await getPersons();
        console.log(results)
        if (Array.isArray(results)) 
            setPersons(results);
        else 
            setPersons({message: results.message});          
    };
    //Get all sorted peoples
    const handleFetchSortedPersons = async (key: string) => {
        const results = await getSortedPersons(key);
        if (Array.isArray(results)) 
            setPersons(results);            
        else 
            setPersons({message: results.message});           
    };
    //Get person by id
    const handleSearchPersonById = (idPerson: number) => {
        if (Array.isArray(persons))
            setEditingPerson(persons.find(person => person.id === idPerson))
    };
    const handleCreatePerson = async (person: Person) => {
        const creatingPerson: CreatePerson = {
            fname: person.fname,
            sname: person.sname,
            birth: person.birth,
            ...(person.club_id !== 0 && { club: person.club_id })
        };
        console.log(`Ta vyvaram personu: ${JSON.stringify(creatingPerson)}`);
        const createStatus = await createPerson(creatingPerson);
        if (createStatus === 1) {
            setAlert({ alertType: true, alertMessage: "Osoba vytvorená"});
            handleCloseFormUI();
            handleFetchAllPeoples();
        }          
        else if (createStatus === 2 ){
            setAlert({ alertType: false, alertMessage: "Nepodarilo sa vytvoriť osobu"}); 
        }             
        else if (createStatus === 3){
            setAlert({ alertType: false, alertMessage: "Nepodarilo sa vytvoriť osobu. Chyba na strane servera"}); 
        }          
    }
    const handleUpdatePerson = async (person: Person) => {        
        const editingPerson: EditPerson = {
            fname: person?.fname,
            sname: person?.sname,
            birth: person?.birth           
        }
        if(person.club_id && person.club_id > 0)
            editingPerson.club = person.club_id;
        
        const editStatus = await updatePerson(person.id,editingPerson);
        if (editStatus === 1) {
            setAlert({ alertType: true, alertMessage: "Osoba upravená"});
            handleCloseFormUI();
            handleFetchAllPeoples();
        } else if (editStatus === 2 ){
            setAlert({ alertType: false, alertMessage: "Nepodarilo sa upraviť osobu"}); 
        } else if (editStatus === 3){
            setAlert({ alertType: false, alertMessage: "Nepodarilo sa upraviť osobu. Chyba na strane servera"}); 
        }  
    };
    const handleDeletePerson = async (personId: number) => {
        console.log(`Ta mazem personu: ${personId}`);
        const deleteStatus = await deletePerson(personId);
        console.log(`Delete status ${deleteStatus}`);
        if (deleteStatus === 1 ) 
            setAlert({ alertType: true, alertMessage: "Osoba odstránená"});            
        else if ( deleteStatus === 2 ) 
            setAlert({ alertType: false, alertMessage: "Nepodarilo sa odstrániť osobu."});         
        else if ( deleteStatus === 3)
            setAlert({ alertType: false, alertMessage: "Nepodarilo sa odstrániť osobu. Chyba na strane servera"});
        handleCloseFormUI();
        handleFetchAllPeoples();
    };
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
        setEditingPerson(undefined);
    };
    const handleCloseAlert = () => {
        setAlert(undefined);
    }    
    useEffect(() => {
        handleFetchAllPeoples();
    },[])



    // Insert selected club(s) ID(s) from DataTable to useState
    const handleRowSelect = (ids: number[]) => {
        console.log(`Ta oznacujem`)
        /* if (JSON.stringify(ids) !== JSON.stringify(selectedIds)) {
            setSelectedIds(ids);
            setSelecting(ids.length > 0);
        } */
    }   
    return (
        <article>
            <div className="flex flex-row justify-between mt-4 text-3xl mx-20 font-bold text-left text-[oklch(var(--foreground))] uppercase">
                <h1>Športovci SZV</h1>
                <div className="flex flex-row gap-2">   
                    { selecting && (
                        <>
                            <Button 
                                variant="red"
                                onClick={() => console.log(`Remove club`)}
                            >
                                Vymazať
                            </Button>
                            <Button 
                                variant="orange"
                                onClick={() => console.log(`Edit club`)}
                            >
                                Upraviť
                            </Button>
                        </>                                                
                    )}            
                    <Button 
                        variant="green"
                        onClick={() => console.log(`Create club`)}
                    >
                        Pridať
                    </Button>
                </div>                
            </div>
            <div className="mx-10">
                <DataTable
                    columns={PersonTableColumns}
                    data={Array.isArray(persons) ? persons : []}
                    onRowSelect={handleRowSelect}
                />

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
                    personData={editingPerson}
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