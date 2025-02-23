import { useEffect, MouseEvent, ChangeEvent, FormEvent, useState } from "react";
//Types
import { Person, defaultPerson } from "../../assets/types/personTypes";
//Childerns
import InputElement from "../forms/InputElement";
import DateElement from "../forms/DateElement";
import GreenButton from "../buttons/GreenButton";


interface Props {
    formTitle?: string;
    personData?: Person;
    handleCloseUI: () => void;
}

const PersonForm: React.FC<Props> = (props) => {
    const [creatingPerson, setCreatingPerson] = useState<Person>(defaultPerson);

    const { formTitle, personData, handleCloseUI } = props;
    //New
    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.id === "fname")
            setCreatingPerson({...creatingPerson, fname:e.target.value})
        else if (e.target.id === "sname")
            setCreatingPerson({...creatingPerson, sname:e.target.value})
        console.log(`Data mi poslal element: ${e.target.id}`);
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

        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleCancelButton(event as unknown as MouseEvent<HTMLButtonElement>);
        }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    })

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
                                inputValue= {personData?.fname || ""}
                                inputLabel="meno"
                                inputName= "fname"
                                handleOnChange={handleInputsChange}
                            />
                            <InputElement
                                inputValue={personData?.sname || ""}
                                inputLabel="priezvisko"
                                inputName= "sname"
                                handleOnChange={handleInputsChange}
                            />                            
                            <DateElement 
                                dateValue= {personData?.birth || ""}
                                elementLabel="dátum narodenia"                               
                                handleSetDate={(date: string) => setCreatingPerson({ ...creatingPerson, birth: date})}
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