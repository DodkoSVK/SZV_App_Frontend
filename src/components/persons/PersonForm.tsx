import { useEffect, ChangeEvent, FormEvent, useState } from "react";
//Types
import { Person, defaultPerson} from "../../assets/types/personTypes";
import { Club } from "../../assets/types/clubTypes";
import { getClubs } from "../../apis/ClubApis";
import { Button } from "../../assets/types";
//Childerns
import InputElement from "../forms/InputElement";
import DateElement from "../forms/DateElement";
import GreenButton from "../buttons/GreenButton";
import YellowButton from "../buttons/OrangeButton";
import RedButton from "../buttons/RedButton";
import ComboBoxPerson from "../forms/ComboBoxPersonForm";


interface Props {
    formTitle?: string;
    personData?: Person;
    closeUI: () => void;
    createPerson: (person: Person) => void;
    updatePerson: (person: Person) => void;
    deletePerson: (person: Person) => void;
}

const PersonForm: React.FC<Props> = (props) => {
    const [greenButton, setGreenButton] = useState<Button>();
    const [person, setPerson] = useState<Person>(defaultPerson);
    const [clubs, setClubs] = useState<Club[] | { message: string }>([]);

    const { formTitle, personData, closeUI, createPerson, updatePerson } = props;
    //New
    const fetchClubs = async () => {
        const response = await getClubs();
        if(Array.isArray(response)) {
            setClubs(response);
        } else {
            setClubs({ message: response.message})
        }        
    };
    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.id === "fname")
            setPerson({...person, fname:e.target.value})
        else if (e.target.id === "sname")
            setPerson({...person, sname:e.target.value})     
    };
    const handleClubSelect = (clubID: number) => {
        console.log(`ID klubu: ${clubID}`)
        setPerson({...person, club_id: clubID})
    };
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') 
            closeUI();            
    };
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formButton = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        if(formButton.name === "create")
            createPerson(person);
        else if (formButton.name === "update")
            updatePerson(person);
    }

    
    

    //Only once
    useEffect(() => {
        setGreenButton({
            buttonName: personData && personData.id > 0 ? "update" : "create",
            buttonText: personData && personData.id > 0 ? "upraviť" : "vytvoriť"                
        });
        fetchClubs();          
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    },[]);
    //After person edited
    useEffect(() => {  
        if(personData)
            setPerson(personData)
        
    }, [personData]);

    return (
        <section>
            <div className="fixed inset-0 z-49 flex items-center justify-center backdrop-filter backdrop-blur-xs">
                <div className="w-full bg-[#0B3C5D] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            {formTitle}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                            <InputElement 
                                inputValue= {person.fname}
                                inputLabel="meno"
                                inputName= "fname"
                                handleOnChange={handleInputsChange}
                            />
                            <InputElement
                                inputValue={person.sname}
                                inputLabel="priezvisko"
                                inputName= "sname"
                                handleOnChange={handleInputsChange}
                            />                            
                            <DateElement 
                                dateValue= {person.birth}
                                elementLabel="dátum narodenia"                               
                                handleSetDate={(date: string) => setPerson({ ...person, birth: date })}
                            /> 
                            <ComboBoxPerson 
                                clubs={clubs}
                                onSelectChange={handleClubSelect}
                            />
                            <div className="flex flex-row space-x-4 justify-center">
                                <GreenButton 
                                    buttonType="submit"
                                    buttonName={greenButton?.buttonName || ""}
                                    buttonText={greenButton?.buttonText || ""}
                                />
                                <YellowButton 
                                    buttonType="button"
                                    buttonName="cancel"
                                    buttonText="zrušiť"
                                    clickAction={closeUI}
                                />
                                { personData && personData.id > 0 && (
                                    <RedButton 
                                        buttonType="submit"
                                        buttonName="delete"
                                        buttonText="vymazať"
                                    />
                                )}
                            </div>                                                     
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default PersonForm;