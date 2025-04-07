//Types
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Competition } from "../../assets/types/competitionTypes";
//Childrens
import InputElement from "../forms/InputElement";
import DateElement from "../forms/DateElement";
import GreenButton from "../buttons/GreenButton";
import ComboBox from "../forms/ComboBoxLeagues";
import { ComboboxItem } from "../../assets/types";
//Methods
import { getLeagues } from "../../apis/leagueApis";
import { getClubs } from "../../apis/ClubApis";

interface Props {
    formTitle?: string;
    competitionData?: Competition
    onClose: () => void;
    onCreateCompetition: (competition: Competition) => void;
    onEditCompetition: (competition: Competition) => void;
    onDeleteCompetition: (competitionId: number) => void;
}

const CompetitionForm: React.FC<Props> = (props) => {
    const { formTitle, competitionData, onClose, onCreateCompetition, onEditCompetition, onDeleteCompetition } = props;

    const [competition, setCompetition] = useState<Competition>(competitionData);    
    const [leagues, setLeagues] = useState<ComboboxItem[] | {message: string}>({message: "Načítavam ligy..."});
    const [clubs, setClubs] = useState<ComboboxItem[] | {message: string}>({message: "Načítavam kluby..."})
    
    const isEdit = competitionData && competitionData.id > 0;
    const buttonName = isEdit ? "edit" : "create";

    //Handle esx key
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') 
            onClose();            
    };
    //Handle edit League
    const handleEditLeague = (id: number) => {
        setCompetition({...competition, league: id})
    }
    //Handle edit Competition Date
    const handleEditDate = (insertedDate: string) => {
        setCompetition({...competition, date: insertedDate})
    }
    //Handle edit Group organiser
    const handleEditOrganise = (locationID: number, clubID: number) => {        
        const updatedLocations = competition.locations.map(loc => 
            loc.id === locationID 
                ? {...loc, club: clubID}
                : loc
        )
        setCompetition(prev => {
            return {
                ...prev,
                locations: updatedLocations
            }
        })        
    }

    //Input change event
    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>, locationID: number) => {
        const { name, value } = e.target;  
        if (name.startsWith("groupId")) {
            const updatedLocations = competition.locations.map(loc =>
                loc.id === locationID
                ? {...loc, group: value}
                : loc
            )
            setCompetition(prev => {
                return {
                    ...prev,
                    locations: updatedLocations
                }
            }) 
        }         
    };
    
    //Add new location to competition
    const handleAddLocation = (e: MouseEvent ) => {
        e.preventDefault();
        const lastId = competition.locations.reduce((max, loc) => Math.max(max, loc.id), 0);
        const newId = lastId + 1;    
        console.log(`Pridavam lokalitu IDLocation: ${newId}`);
    
        setCompetition(prev => {
            return {
                ...prev,
                locations: [...prev.locations, {id: newId, group: "", city: "", club: 0}]
            };
        });
    }
    
    //Remove location from competition
    const handleRemoveLocation = (id: number, e: MouseEvent) => {
        e.preventDefault();
        console.log(`Odstranujem lokalitu IDLocation: ${id}`);
        setCompetition(prev => {
            const filtered = prev.locations.filter(location => location.id !== id);
            const reindexed = filtered.map((location, index) => ({
                ...location,
                id: index + 1
            }));
    
            return {
                ...prev,
                locations: reindexed
            };
        });
    } 

    

    

    //Handle create competition
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const buttonName = e.currentTarget.name;            
        
        if (buttonName === "create") {
            console.log("Vytváram súťaž:"); 
            onCreateCompetition(competition);  
        } else if (buttonName === "edit") {
            console.log("Upravená súťaž:"); 
            onEditCompetition(competition); 
        }        
        onClose();
    };

    //Listener for keydown event to close form UI
    // Close form UI on Escape key press
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Close form UI on component unmount
    useEffect(() => {
    if (competitionData) {
        console.log("🔁 useEffect competitionData:", competitionData);
        setCompetition(competitionData);
    }
    }, [competitionData]);
    useEffect(() => {
        const fetchLeagues = async () => {
            const leagues = await getLeagues();
            console.log("🔁 useEffect leagues:", JSON.stringify(leagues));    
            if (Array.isArray(leagues) && leagues.length > 0) {
                setLeagues(leagues.map((league) => ({
                    id: league.id,
                    name: league.name
                })));
            }
        };
        const fetchClubs = async () => {
            const clubs = await getClubs();
            if(Array.isArray(clubs) && clubs.length > 0) {
                setClubs(clubs.map((club) => ({
                    id: club.id,
                    name: club.name
                })));
            }            
        };        
        fetchLeagues();
        fetchClubs();
    }, []);
    
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
                            />                             
                            <ComboBox
                                comboboxTitle="Liga"
                                items={leagues}
                                onSelectChange={handleEditLeague}
                            />
                            <DateElement
                                elementLabel="Dátum súťaže"
                                elementValue={competition.date}
                                setPersonBirth={(date) => handleEditDate(date)}
                            />
                            <div className="flex flex-row items-center justify-around pb-1 pl-2 text-white border-b-2 border-[#D9B310] border-solid">
                                <h3 className="">Skupiny</h3>
                                <button 
                                    onClick={(e) => handleAddLocation(e)}
                                    className="flex flex-row text-green-500 gap-2 cursor-pointer transform transition-transform hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>Pridať</span>
                                </button>                                  
                            </div>                          
                            {Array.isArray(competition.locations) && competition.locations.length > 0 ? (
                                <div>                                                                       
                                    {competition.locations.map(location => (
                                    <div key={location.id} className="mt-4 border rounded-lg border-gray-500 border-2">
                                        <div className="flex flex-row py-2 mx-4 justify-around text-white border-b-2 border-solid">
                                            <h3>{`Skupina ${location.id} / ${location.group}`}</h3>
                                            <button 
                                                onClick={(e) => handleRemoveLocation(location.id, e)}
                                                className="flex flex-row text-red-500 gap-2 cursor-pointer transform transition-transform hover:scale-110">                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <span>Odstrániť</span>
                                            </button>
                                        </div>
                                        <div className="pt-4 ml-6 mr-6 ">
                                            <ComboBox 
                                                comboboxTitle="Organizátor"
                                                items={clubs}
                                                onSelectChange={(clubID) => handleEditOrganise(location.id, clubID)}
                                            />
                                            <InputElement 
                                                inputValue={location.group}
                                                inputLabel={`Skupina ${location.id}`}
                                                inputName={`groupId${location.id}`}
                                                handleOnChange={(e) => handleInputsChange(e, location.id)}
                                            />                                             
                                        </div>                                
                                    </div>                                    
                                ))}
                                </div>
                            ) : (
                                <p className="flex flex-row justify-center mt-4 p-2 rounded-lg border-gray-500 border-2 text-white font-bold ">Žiadne skupiny</p>
                            )}
                            <div className="flex flex=row justify-center items-center gap-2 pt-4">
                            <GreenButton
                                buttonType="submit"
                                buttonName={buttonName}
                                buttonText={formTitle}
                                clickAction={handleSubmit}
                            >
                                <span>{formTitle}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </GreenButton>
                            <button 
                                name="cancel"
                                onClick={onClose}
                                className="flex flex-row items-center gap-2 rounded-lg border border-red-500 px-3 py-2 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white">
                                <span>Zrušiť</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>  
                            </div>
                        </form>                            
                    </div>
                </div>
            </div>
        </section>
    );
};
export default CompetitionForm;


