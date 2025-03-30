//Types
import { ChangeEvent, useState } from "react";
import { Competition } from "../../assets/types/competitionTypes";
//Childrens
import InputElement from "../forms/InputElement";
import GreenButton from "../buttons/GreenButton";

import plusIcon from '../../assets/plus.svg';
import DateElement from "../forms/DateElement";

interface Props {
    formTitle?: string;
    competitionData: Competition
}

const CompetitionForm: React.FC<Props> = (props) => {
    const { formTitle, competitionData } = props;

    const [competition, setCompetition] = useState<Competition>(competitionData);    

    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.id === "compId")
            setCompetition({ ...competition, league:e.target.value})
    }

    const addLocation = () => {
        const lastId = competition.locations.reduce((max, loc) => Math.max(max, loc.id), 0);
        const newId = lastId + 1;
    
        const newLocation = {
            id: newId,
            group: "",
            city: "",
            date: ""
        };
    
        setCompetition(prev => ({
            ...prev,
            locations: [...prev.locations, newLocation]
        }));
    }

    return (
        <section>
            <div className="fixed inset-0 z-49 flex items-center justify-center backdrop-filter backdrop-blur-xs">
                <div className="w-full bg-[#0B3C5D] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            {formTitle}
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <InputElement 
                                inputValue={competition.round}
                                inputLabel="Kolo"
                                inputName="roundId"
                                handleOnChange={handleInputsChange}
                            />
                            <InputElement 
                                inputValue={competition.league}
                                inputLabel="Súťaž"
                                inputName="compId"
                                handleOnChange={handleInputsChange}
                            />                            
                            {Array.isArray(competition.locations) && competition.locations.length > 0 ? (
                                <div>
                                    <div className="flex flex-row items-center justify-around pb-1 pl-2 text-white border-b-2 border-[#D9B310] border-solid">
                                        <h3 className="">Skupiny</h3>
                                        <button className="flex flex-row text-green-500 gap-2 cursor-pointer transform transition-transform hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <span>Pridať</span>
                                        </button>                                  
                                    </div>                                    
                                    {competition.locations.map(location => (
                                    <div key={location.id} className="mt-4 border rounded-lg border-gray-500 border-2">
                                        <div className="flex flex-row py-2 mx-4 justify-around text-white border-b-2 border-solid">
                                            <h3>{`Skupina ${location.id} / ${location.group}`}</h3>
                                            <button className="flex flex-row text-red-500 gap-2 cursor-pointer transform transition-transform hover:scale-110">                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <span>Odstrániť</span>
                                            </button>
                                        </div>
                                        <div className="pt-4 ml-6">
                                            <InputElement                                                 
                                                    inputValue={location.city}
                                                    inputLabel={`Organizátor ${location.id}`}
                                                    inputName={`locationID${location.id}`}
                                                    handleOnChange={handleInputsChange}
                                            />
                                        </div>
                                        
                                        <div className="flex flex-row gap-2">
                                            <InputElement 
                                                inputValue={location.group}
                                                inputLabel={`Skupina ${location.id}`}
                                                inputName={`groupId${location.id}`}
                                                handleOnChange={handleInputsChange}
                                            />                                            
                                        </div>                                 
                                    </div>                                    
                                ))}
                                </div>
                            ) : (
                                <p className="text-white">Žiadne skupiny</p>
                            )}
                        </form>
                            <GreenButton
                                buttonType="button"
                                buttonName="addGroup"
                                buttonText="Pridať skupinu"
                                clickAction={addLocation}
                                size="sm"

                            />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default CompetitionForm;


