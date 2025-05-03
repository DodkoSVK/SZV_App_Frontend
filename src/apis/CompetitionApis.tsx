import axios from "axios";
import { CreateCompetition, EditCompetition } from "../assets/types/competitionTypes";

export const getCompetitions = async () => {
    console.log("🟡 Získavam všetky súťaže");
    return axios.get('https://app.vzpieranie.sk:3002/api/competition').then(response => {
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

export const createCompetition = async (competition: CreateCompetition) => {
    console.log("🟡 Vytváram súťaž s týmito údajmi: ", competition);
    return axios.post('https://app.vzpieranie.sk:3002/api/competition', competition).then(response => {            
        const code = response.status;            
        if (code >= 200 && code < 300) return 1;                
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri vytváraní súťaže: ${code}`);
        if(code >= 400 && code < 500) return 2;                      
        if(code >= 500) return 3;                             
    });
}

export const editCompetition = async (competition: EditCompetition) => {
    console.log(`🟡 Upravujem osobu s týmito údajmi: ${JSON.stringify(competition)}`);
    return axios.patch(`https://app.vzpieranie.sk:3002/api/competitioncd/${competition.id}`, competition)    
    .then(res => {
        const code = res.status;
        if (code >= 200 && code < 300) return 1;          
    }).catch(e => {
        const code = e.status;            
        console.log(`🔴 Chyba pri úprave osoby: ${code}`);
        if(code >= 400 && code < 500) return 2;                                      
        if(code >= 500) return 3;   
    });
}