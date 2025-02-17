import { FormEvent, MouseEvent, useRef, useEffect, useState } from "react";
import { CreateClub, EditClub, Club, Button, PersonSelect} from "../../assets/types";
import axios from 'axios';
//Child Components
import RedButton from "../buttons/RedButton";
import GreenButton from "../buttons/GreenButton";
import YellowButton from "../buttons/OrangeButton";
import ComboBox from "../forms/ComboBox";

/**
 * closeCreateClubUI -> Closing form UI
 * handleCreateClub -> handle create a new club, sending club data
 * handleEditClub -> handle edit an existing club, sending club data
 * handleDeleteClub -> handle delete an existing club, sending club id
 * clubData -> getting data about existing club to edit
 * formTitle -> title for form
 *
 * @interface Props
 */
interface Props {
    closeCreateClubUI: () => void;
    handleCreateClub: (club: CreateClub) => void;
    handleEditClub: (club: EditClub) => void;
    handleDeleteClub: (id: number) => void;
    clubData: Club;
    formTitle: string;
};

const ClubCreateForm: React.FC<Props> = (props) => {        
    // UseStates
    const [greenButton, setGreenButton] = useState<Button>();
    const [personWithoutClub, setPersonWithoutClub] = useState<PersonSelect[]>([{ id: 0, fname: "Načítavam osoby...", sname: "", club: "" }]);
    // Form Refs
    const clubNameInput = useRef<HTMLInputElement>(null);
    const clubStreetInput = useRef<HTMLInputElement>(null);
    const clubCityInput = useRef<HTMLInputElement>(null);
    const clubPostalInput = useRef<HTMLInputElement>(null);
    const clubIcoInput = useRef<HTMLInputElement>(null);
    const clubTelInput = useRef<HTMLInputElement>(null);
    const clubMailInput = useRef<HTMLInputElement>(null);
    //Props const
    const { clubData } = props;

    // NEED CHANGE FROM PEOPLES !
    const getPersonWithoutClub = async () => {
        axios.get("http://localhost:3002/api/person/").then(response => {
            console.log(`🟡 Načítavam ľudí bez klubu`);
            if(Array.isArray(response.data) && response.data.length > 0){
                setPersonWithoutClub(response.data);
            } else {
                setPersonWithoutClub([{ id: 0, fname: "Nenašli sa ľudia bez klubu", sname: "", club: "" }]);
            }
        }).catch(error => {
            console.error("Error fetching persons without club:", error);
            setPersonWithoutClub([{ id: 0, fname: "Chyba pri načítaní osôb", sname: "", club: ""  }]);
        });
    }

    /**
     * Handle submit event create, update or delete club
     *
     * @param {FormEvent<HTMLFormElement>} e -> Clicked submit button
     */
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formButton = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        if (formButton.name === "create") {
            //console.log("Vytváram klub");
            const createClubData: CreateClub = {
                name: clubNameInput.current?.value || "",
                city: clubCityInput.current?.value || "",
                street: clubStreetInput.current?.value || "",
                postal: clubPostalInput.current?.value || "",
                ico: clubIcoInput.current?.value || "",
                mail: clubMailInput.current?.value || "",
                tel: clubTelInput.current?.value || "",
            }
            props.handleCreateClub(createClubData);
        }
        if(formButton.name === "update") {
            //console.log("Editujem klub");
            const editClub: EditClub = {
                id: clubData.id,
                name: clubNameInput.current?.value || "",
                city: clubCityInput.current?.value || "",
                street: clubStreetInput.current?.value || "",
                postal: clubPostalInput.current?.value || "",
                ico: clubIcoInput.current?.value || "",
                mail: clubMailInput.current?.value || "",
                tel: clubTelInput.current?.value || "",
                chid: clubData.chid || 0
            }
            props.handleEditClub(editClub);
        }
        if(formButton.name === "delete") {
            //console.log("Mažem klub");
            props.handleDeleteClub(clubData.id);
        }
    };
    /**
     * Handle for close form UI
     *
     * @param {MouseEvent<HTMLButtonElement>} e -> Clicked button
     */
    const handleCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        console.log("Ruším vytvorenie klubu");
        props.closeCreateClubUI();
    };
    
    /**
     * Get person ID from ComboBox to clubdata
     *
     * @param {number} id => Club chairman ID
     */
    const handleSelectChange = (id: number) => {
        clubData.chid = id; 
    }
        
    useEffect(() => {
        if(clubData.id > 0){
            if (clubNameInput.current) clubNameInput.current.value = clubData.name;
            if (clubStreetInput.current) clubStreetInput.current.value = clubData.street;
            if (clubCityInput.current) clubCityInput.current.value = clubData.city;
            if (clubPostalInput.current) clubPostalInput.current.value = clubData.postal;
            if (clubIcoInput.current) clubIcoInput.current.value = clubData.ico;
            if (clubTelInput.current) clubTelInput.current.value = clubData.tel;
            if (clubMailInput.current) clubMailInput.current.value = clubData.mail;
        }
        setGreenButton({
            buttonName: clubData.id > 0 ? "update" : "create",
            buttonText: clubData.id > 0 ? "upraviť" : "vytvoriť"                
        })                
        getPersonWithoutClub();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCancelButton(event as unknown as MouseEvent<HTMLButtonElement>);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [clubData]);

    return (
        <section>
            <div className="fixed inset-0 z-49 flex items-center justify-center backdrop-filter backdrop-blur-xs">
                <div className="w-full bg-[#0B3C5D] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            {props.formTitle}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    ref={clubNameInput}
                                    type="text"
                                    name="name"
                                    id="floating_name"
                                    className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_name"
                                    className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Názov klubu</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    ref={clubStreetInput}
                                    type="text"
                                    name="street"
                                    id="floating_street"
                                    className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_street"
                                    className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Ulica</label>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div className="relative z-0 w-full group">
                                    <input
                                        ref={clubCityInput}
                                        type="text"
                                        name="city"
                                        id="floating_city"
                                        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_city"
                                        className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >Mesto</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input
                                        ref={clubPostalInput}
                                        type="text"
                                        name="postal"
                                        id="floating_psc"
                                        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_psc"
                                        className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >PSČ</label>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div className="relative z-0 w-full group">
                                    <input
                                        ref={clubIcoInput}
                                        type="text"
                                        name="ico"
                                        id="floating_ico"
                                        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_ico"
                                        className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >IČO</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input
                                        ref={clubTelInput}
                                        type="text"
                                        name="tel"
                                        id="floating_tel"
                                        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="floating_tel"
                                        className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >Tel</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    ref={clubMailInput}
                                    type="email"
                                    name="mail"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Email</label>
                            </div>
                            <ComboBox 
                                people={personWithoutClub}
                                onSelectChange={(id:number) => handleSelectChange(id)}
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
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClubCreateForm;