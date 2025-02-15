import { FormEvent, MouseEvent, useRef, useEffect } from "react";
import { CreateClub, Club} from "../../assets/types";
//Child Components
import RedButton from "../buttons/RedButton";
import GreenButton from "../buttons/GreenButton";
import YellowButton from "../buttons/OrangeButton";

interface Props {
    closeCreateClubUI: () => void;
    handleCreateClub: (club: CreateClub) => void;
    clubData: Club;
    formTitle: string;
};

const ClubCreateForm: React.FC<Props> = (props) => {    
    const clubNameInput = useRef<HTMLInputElement>(null);
    const clubStreetInput = useRef<HTMLInputElement>(null);
    const clubCityInput = useRef<HTMLInputElement>(null);
    const clubPostalInput = useRef<HTMLInputElement>(null);
    const clubIcoInput = useRef<HTMLInputElement>(null);
    const clubTelInput = useRef<HTMLInputElement>(null);
    const clubMailInput = useRef<HTMLInputElement>(null);
   
    const handleCreateClubForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formButton = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        if (formButton.name === "create") {
            console.log("Vytváram klub");
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
    };

    const handleCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Ruším vytvorenie klubu");
        props.closeCreateClubUI();
    };

    useEffect(() => {
        console.log(`Hodnoty klub data: ${JSON.stringify(props.clubData)}`);
    
        // Skontrolujeme, či `clubData` je pole a či obsahuje aspoň jeden prvok
        const club = Array.isArray(props.clubData) && props.clubData.length > 0 ? props.clubData[0] : null;        
        if (club) {
            console.log(`Idem dať do inputov`);    
            if (clubNameInput.current) clubNameInput.current.value = club.name;
            if (clubStreetInput.current) clubStreetInput.current.value = club.street;
            if (clubCityInput.current) clubCityInput.current.value = club.city;
            if (clubPostalInput.current) clubPostalInput.current.value = club.postal;
            if (clubIcoInput.current) clubIcoInput.current.value = club.ico;
            if (clubTelInput.current) clubTelInput.current.value = club.tel;
            if (clubMailInput.current) clubMailInput.current.value = club.mail;           
        }
    }, [props.clubData]);
    const test = Array.isArray(props.clubData) && props.clubData.length > 0 ? props.clubData[0] : null;   
    console.log(`Test: ${test}`);
    const greenButtonText = test.id > 0 ? "upraviť" : "vytvoriť";
    const greenButtonName = test.id > 0 ? "update" : "create";
    console.log(`Name: ${greenButtonName}, text: ${greenButtonText}`);
    
    
    
    

    return (
        <section>
            <div className="fixed inset-0 z-49 flex items-center justify-center backdrop-filter backdrop-blur-xs">
                <div className="w-full bg-[#0B3C5D] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            {props.formTitle}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleCreateClubForm}>
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
                            <div className="flex flex-row space-x-4 justify-center">
                                <GreenButton                                     
                                    buttonType="submit"
                                    buttonName="{redButton.buttonName}"
                                    buttonText="{redButton.buttonText}"                               
                                />                           
                                <RedButton 
                                    buttonType="button"
                                    buttonName="cancel"
                                    buttonText="zrušiť"    
                                    clickAction={handleCancelButton} 
                                />
                                <YellowButton 
                                    buttonType="button"
                                    buttonName="cancel"
                                    buttonText="vymazať"    
                                    clickAction={handleCancelButton} 
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClubCreateForm;