import { useRef } from "react";
//Childerns


interface Props {
    formTitle?: string
}

const PersonForm: React.FC<Props> = (props) => {
    const fnameInput = useRef<HTMLInputElement>(null);
    const sNameInput = useRef<HTMLInputElement>(null);

    const handleClubFormSubmit = async () => {
        console.log(`Posielam formulat`);
    }

    return (
        <section>
            <div className="fixed inset-0 z-49 flex items-center justify-center backdrop-filter backdrop-blur-xs">
                <div className="w-full bg-[#0B3C5D] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            {props.formTitle}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleClubFormSubmit}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    ref={fnameInput}
                                    type="text"
                                    name="fname"
                                    id="floating_fname"
                                    className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_fname"
                                    className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Meno</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    ref={sNameInput}
                                    type="text"
                                    name="sname"
                                    id="floating_sname"
                                    className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_street"
                                    className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Priezvisko</label>
                            </div>
                                                                              
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