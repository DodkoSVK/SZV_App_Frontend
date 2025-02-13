import { FormEvent, MouseEvent } from "react";
import { CreateClub } from "../../assets/types";

interface Props {
    closeCreateClubUI: () => void
    handleCreateClub: (club : CreateClub) => void
};

const ClubCreateForm: React.FC<Props> = (props) => {

    const handleCreateClubForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formButton = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        if(formButton.name === "create"){
            console.log("Vytváram klub");
            const createClubData: CreateClub = {
                name: (e.target as HTMLFormElement).floating_name.value,
                city: (e.target as HTMLFormElement).floating_city.value,
                street: (e.target as HTMLFormElement).floating_street.value,
                postal: (e.target as HTMLFormElement).floating_psc.value,
                ico: (e.target as HTMLFormElement).floating_ico.value,
                mail: (e.target as HTMLFormElement).floating_email.value,
                tel: (e.target as HTMLFormElement).floating_tel.value,
            }
            props.handleCreateClub(createClubData);
        }        
    };
    const handleCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Ruším vytvorenie klubu");
        props.closeCreateClubUI();
    };

    return (   
        <section>
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">               
                <div className="w-full bg-[] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            Vytvoriť nový klub
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleCreateClubForm}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input                                     
                                    type="text"
                                    name="floating_name"
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
                                    type="text"
                                    name="floating_street"
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
                                        type="text"
                                        name="floating_city"
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
                                        type="text"
                                        name="floating_psc"
                                        id="floating_psc"
                                        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_psc"
                                        className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PSČ</label>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div className="relative z-0 w-full group">
                                    <input
                                        type="text"
                                        name="floating_ico"
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
                                        type="text"
                                        name="floating_tel"
                                        id="floating_tel"
                                        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_tel"
                                        className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >Tel</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="email"
                                    name="floating_email"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
                                    placeholder=" "
                                    required />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >Email</label>
                            </div>
                            <div className="flex flex-row space-x-4 justify-center">
                                <button 
                                    name="create"
                                    type="submit"
                                    className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Vytvoriť
                                </button>
                                <button 
                                    onClick={handleCancelButton}
                                    name="cancel"
                                    type="button"
                                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Zrušiť
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClubCreateForm;