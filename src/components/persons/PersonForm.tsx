import { useEffect, MouseEvent, ChangeEvent, FormEvent, useState } from "react";
//Types
import { Person, defaultPerson } from "../../assets/types/personTypes";
import { Club } from "../../assets/types/clubTypes";
import { getClubs } from "../../apis/ClubApis";
//Childerns
import InputElement from "../forms/InputElement";
import DateElement from "../forms/DateElement";
import GreenButton from "../buttons/GreenButton";
import ComboBoxPerson from "../forms/ComboBoxPersonForm";


interface Props {
    formTitle?: string;
    personData?: Person;
    handleCloseUI: () => void;
}

const PersonForm: React.FC<Props> = (props) => {
    const [creatingPerson, setCreatingPerson] = useState<Person>(defaultPerson);
    const [clubs, setClubs] = useState<Club[] | { message: string }>([]);

    const { formTitle, personData, handleCloseUI } = props;
    //New
    const fetchClubs = async () => {
        const response = await getClubs();
        if(Array.isArray(response)) {
            setClubs(response);
        } else {
            setClubs({ message: response.message})
        }
        
    }
    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.id === "fname")
            setCreatingPerson({...creatingPerson, fname:e.target.value})
        else if (e.target.id === "sname")
            setCreatingPerson({...creatingPerson, sname:e.target.value})     
    };
    const handleClubSelect = (clubID: number) => {
        console.log(`ID klubu: ${clubID}`)
        //setCreatingPerson({...creatingPerson, club: clubID})
    }



    //OLD
    const handleClubFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Posielam formular s udajmi ${JSON.stringify(creatingPerson)}`);
    }
    const handleCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        console.log("Ruším vytvorenie klubu");
        props.handleCloseUI();
    };
    
    useEffect(() => {  
        fetchClubs();     
        if(personData)
            setCreatingPerson(personData)
        else
            setCreatingPerson(defaultPerson)

        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleCancelButton(event as unknown as MouseEvent<HTMLButtonElement>);
        }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [personData]);

    return (
        <section>
            <div className="fixed inset-0 z-49 flex items-center justify-center backdrop-filter backdrop-blur-xs">
                <div className="w-full bg-[#0B3C5D] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            {formTitle}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleClubFormSubmit}>
                            <InputElement 
                                inputValue= {creatingPerson.fname}
                                inputLabel="meno"
                                inputName= "fname"
                                handleOnChange={handleInputsChange}
                            />
                            <InputElement
                                inputValue={creatingPerson.sname}
                                inputLabel="priezvisko"
                                inputName= "sname"
                                handleOnChange={handleInputsChange}
                            />                            
                            <DateElement 
                                dateValue= {creatingPerson.birth}
                                elementLabel="dátum narodenia"                               
                                handleSetDate={(date: string) => setCreatingPerson({ ...creatingPerson, birth: date})}
                            /> 
                            <ComboBoxPerson 
                                clubs={clubs}
                                onSelectChange={handleClubSelect}
                            />
                            <GreenButton                                     
                                buttonType="submit"
                                buttonName={"create"}
                                buttonText={"create"}                             
                            />                                                       
                            {/*
                            {clubData.id > 0 && (
                                <SelectElement   
                                    selectOptions={personWithoutClub}                                  
                                    selectLabel="Štatutár klubu"
                                    selectedItem={handleSelectChange}
                                />   
                            )}
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
                                    clickAction={handleCancelButton} 
                                />
                                {clubData.id > 0 && (
                                    <RedButton 
                                        buttonType="submit"
                                        buttonName="delete"
                                        buttonText="vymazať"  
                                    />
                                )}                                 
                            </div>
                            */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default PersonForm;