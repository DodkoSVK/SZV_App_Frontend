import axios from "axios";
import { Competition } from "../assets/types/competitionTypes";

export const getCompetitions = async () => {
    console.log("🟡 Získavam všetky súťaže");
    return axios.get('http://localhost:3002/api/competition').then(response => {
        const code = response.status;
        if (code >= 200 && code < 300) {
            if(Array.isArray(response.data)) return (response.data);            
            else return ({ message: "Nenašli sa žiadne súťaže"});
        }
        return { message: "Nenašli sa žiadne súťaže" };                 
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri získavaní súťaží: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní súťaží" }; 
    });
};

export const createCompetition = async (competition: Competition) => {
    console.log("🟡 Vytváram súťaž s týmito údajmi: ", competition);
    return axios.post('http://localhost:3002/api/competition', competition).then(response => {            
        const code = response.status;            
        if (code >= 200 && code < 300) return 1;                
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri vytváraní súťaže: ${code}`);
        if(code >= 400 && code < 500) return 2;                      
        if(code >= 500) return 3;                             
    });
}