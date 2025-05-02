// React, Methods
import { useEffect, useState, useRef } from "react";
import { getPersons, createPerson, editPerson, deletePerson} from "@/apis/PersonApis";
//Types
import { Person, CreatePerson, EditPerson } from "@/assets/types/personTypes";
import { Alert } from "@/assets/types/index";
//Children Components
import SuccessAlert from "@/components/alerts/SuccessAlert";
import FailedAlert from "@/components/alerts/FailedAlert";
import DataTable from "@/components/tables/DataTable";
import PersonTableColumns from "@/components/tables/PersonTableColumns";
import PersonForm from "@/components/forms/PersonForm";
// ShadUi Components
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

//Component
const ThePersons: React.FC = () => {
    // useStates
    const [persons, setPersons] = useState<Person[]>([]); // Fetched persons from DB
    const [editingPerson, setEditingPerson] = useState<Person[]>([]); // Array of selected persons to edit
    const [formUI, setFormUI] = useState<boolean>(false); // State to show Person Form UI
    const [alert, setAlert] = useState<Alert | null>(null); // State to show alert message
    const [ selecting, setSelecting ] = useState<boolean>(false); // True -> user selecting person(s)
    const [ selectedIds, setSelectedIds ] = useState<number[]>([]); // Selected ID(s) person(s)
    // useRefs
    const tableRef = useRef<Table<Person> | null>(null); //Ref to person table for deselect row(s)
    // Fetching all persons
    const fetchPersons = async () => {
        try {
            const results = await getPersons();
            if (Array.isArray(results)) 
                setPersons(results);  
        } catch (e) {
            const error = 2001;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }                     
    };
    // Create a new Person
    const submitPerson = async (personData: CreatePerson) => {
        try {
            const submitStatus = await createPerson(personData);
            if(submitStatus === 1 ) {
                setAlert({
                    alertType: true,
                    alertMessage: "Osoba bola úspešne vytvorená"
                });
                await fetchPersons();
                setFormUI(false);
            } else if (submitStatus === 2 ) {
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
        } catch (e) {
            const error = 2002;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }        
    };
    // Edit an a existing person
    const updatePerson = async (personData: EditPerson) => {
        try {
            const updateStatus = await editPerson(personData);
            if (updateStatus === 1 ) {
                setAlert({
                    alertType: true,
                    alertMessage: "Osoba bola úspešne upravená"
                });
                await fetchPersons();
            } else if (updateStatus === 2 ) {
                setAlert({
                    alertType: false,
                    alertMessage: "Nesprávna požiadavka"
                }) 
            } else if (updateStatus === 3) {
                setAlert({
                    alertType: false,
                    alertMessage: "Chyba pri spracovaní požiadavky"
                });
            }
        } catch (e) {
            const error = 2003;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    }
    // Remove an a existing person(s)
    const removePerson = async () => {
        try {
            let howMuch = 0;
            for (const selectedId of selectedIds) {
                const removeStatus = await deletePerson(selectedId);
                if( removeStatus === 2 ) {
                    setAlert({ alertType: false, alertMessage: "Nepodarilo sa vymazať osobu"});
                    break;
                }
                howMuch++;
            }
            if( howMuch > 1)
                setAlert({ alertType: true, alertMessage: `Bolo úspešne vymazaných ${howMuch} osôb.` });
            else
                setAlert({ alertType: true, alertMessage: "Osoba úspešne vymazaná." }); 
            
            await fetchPersons();       
            handleCloseFormUI(); 
        } catch (e) {
            const error = 2004;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    }
    // Method for closing alert, if user is faster than countdown
    const handleCloseAlert = () => {
        try {
            setAlert(null);
        } catch (e) {
            const error = 2005;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    }    
    // Method to insert selected Person(s) from DataTable to useState
    const handleRowSelect = (ids: number[]) => {
        try {
            if (JSON.stringify(ids) !== JSON.stringify(selectedIds)) {
                setSelectedIds(ids);
                setSelecting(ids.length > 0);
            }
        } catch (e) {
            const error = 2006;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    }   
    // Open formUi after clicking to button
    const handleOpenFormUI = () => {
        try {
            if(selectedIds.length === 0) {
                setFormUI(true);    
            } else {
                searchPersonByID(selectedIds);            
                setFormUI(true);
            } 
        } catch (e) {
            const error = 2007;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    };
    // Close form UI, -> Reload persons -> Close FormUI -> Turn OFF selecting -> Reset selecting ID and persons -> Deselect table row(s)
    const handleCloseFormUI = () => {
        fetchPersons();
        setFormUI(false);
        setSelecting(false);
        setSelectedIds([]);
        setEditingPerson([]);
        tableRef.current?.resetRowSelection();
    };
    // Find person by ID in fetched persons and stored in component useState
    const searchPersonByID = (ids: number[]) => {
        try {
            if (Array.isArray(persons) && Array.isArray(ids)) {
                const foundPersons = persons.filter(person => ids.includes(person.id));
                setEditingPerson(foundPersons);
            }
        } catch (e) {
            const error = 2008;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    };
    // Fetch persons(s) after load
    useEffect(() => {
        fetchPersons();
    },[]);
    // Return component   
    return (
        <article>
            <div className="flex flex-row justify-between mt-4 text-3xl mx-20 font-bold text-left text-[oklch(var(--foreground))] uppercase">
                <h1>Športovci SZV</h1>
                <div className="flex flex-row gap-2">   
                    { selecting && (
                        <>
                            <Button 
                                variant="red"
                                onClick={() => removePerson()}
                            >
                                Vymazať
                            </Button>
                            <Button 
                                variant="orange"
                                onClick={() => handleOpenFormUI()}
                            >
                                Upraviť
                            </Button>
                        </>                                                
                    )}            
                    <Button 
                        variant="green"
                        onClick={() => handleOpenFormUI()}
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
                    tableRef={tableRef}
                    columnFilterName="fname"
                />

            </div>            
            { formUI && (
                <PersonForm 
                    personData={editingPerson}
                    handleCloseUI={handleCloseFormUI}
                    onCreate={submitPerson}
                    onEdit={updatePerson}
                />
            )}
            {alert?.alertType === true && (
                <SuccessAlert  
                    alertMessage={alert.alertMessage}
                    closeRequest={handleCloseAlert}
                />
            )}
            {alert?.alertType === false && (
                <FailedAlert
                    alertMessage={alert.alertMessage}
                    closeRequest={handleCloseAlert}
                />
            )}
        </article>
    );    
};
export default ThePersons;