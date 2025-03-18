import { NavLink } from "react-router";

function TheNavigation() {
    return (      
        <nav className="flex flex-row items-center justify-around bg-[#0B3C5D] bg-opacity-90 text-[#F7F9FB] uppercase rounded-xl ">
            <div>
                <NavLink to="/" className="flex items-center space-x-2">
                    <img src="../../src/assets/szv_logo.webp" alt="SZV Logo" className="h-15 w-15 p-2"/>
                    <h1 className="text-2xl font-bold">SZV Aplikácia</h1>
                </NavLink>                
            </div>
            <ul className="flex flex-row items-center justify-items-stretch space-x-5 text-lg font-bold">
            <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'underline underline-offset-4 decoration-2 text-[#D9B310] hover:text-[#D9B310]' : 'text-[#F7F9FB] hover:text-[#D9B310]'}
                    >Domov</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/clubs"
                        className={({ isActive }) => isActive ? 'underline underline-offset-4 decoration-2 text-[#D9B310] hover:text-[#D9B310]' : 'text-[#F7F9FB] hover:text-[#D9B310]'}
                    >Kluby</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/persons"
                        className={({ isActive }) => isActive ? 'underline underline-offset-4 decoration-2 text-[#D9B310] hover:text-[#D9B310]' : 'text-[#F7F9FB] hover:text-[#D9B310]'}
                    >Ľudia</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/competitions"
                        className={({ isActive }) => isActive ? 'underline underline-offset-4 decoration-2 text-[#D9B310] hover:text-[#D9B310]' : 'text-[#F7F9FB] hover:text-[#D9B310]'}
                    >Súťaže</NavLink>
                </li>
            </ul>
            <div>
                <button 
                    type="button"
                    className="rounded-md border-solid border-2 border-[#F7F9FB] text-[#F7F9FB] p-1 px-2 font-semibold capitalize text-lg hover:text-[#D9B310] transform transition-transform duration-300 hover:scale-110"
                >prihlásiť</button>
            </div>
        </nav>
    );
};

export default TheNavigation