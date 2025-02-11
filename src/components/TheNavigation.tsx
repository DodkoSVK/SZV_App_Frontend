import { NavLink } from "react-router";

function TheNavigation() {
    return (      
        <nav className="flex flex-row items-center justify-around bg-[#25274D] text-[#2E9CCA] uppercase m-4 rounded-xl ">
            <div className="flex flex-row items-center">
                <NavLink to="/" className="flex items-center space-x-2">
                    <img src="../../src/assets/szv_logo.webp" alt="SZV Logo" className="h-20 w-20 p-2"/>
                    <h1 className="text-2xl font-bold">SZV Aplikácia</h1>
                </NavLink>
                
            </div>
            <ul className="flex flex-row items-center justify-items-stretch space-x-5 text-lg font-bold">
                <li>
                    <NavLink to="/">Domov</NavLink>
                </li>
                <li>
                    <NavLink to="/clubs">Kluby</NavLink>
                </li>
                <li>
                    <NavLink to="/persons">Ľudia</NavLink>
                </li>
            </ul>
            <div>
                <button>Prihlásiť</button>
            </div>
        </nav>
    );
};

export default TheNavigation