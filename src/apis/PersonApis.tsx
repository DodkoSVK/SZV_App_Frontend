import axios from "axios";
import { CreatePerson, EditPerson } from "../assets/types/personTypes";

export const getPersons = async () => {
    console.log(`🟡 Načítavam všetky osoby`);
    return axios.get('https://app.vzpieranie.sk:3002/api/person').then(res => {        
        const code = res.status;        
        if(code >= 200 && code < 300) 
            if(Array.isArray(res.data)) return (res.data);            
        return { message: "Nenašli sa žiadne osoby" };     
    }).catch(e => {
        const code = e.res.status;          
        console.log(`🔴 Chyba pri získavaní osôb: ${JSON.stringify(code)}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní osôb" }; 
    });
};
export const getPersonByID = async (id: number) => {
    console.log(`🟡 Načítavam osobu`);
    return axios.get(`https://app.vzpieranie.sk:3002/api/person/${id}`).then(res => {    
        const code = res.status;
        if(code >= 200 && code < 300) {
            if(Array.isArray(res.data)) return (res.data);            
            else  return ({ message: "Nenašli sa žiadne osoby"});  
        } 
        return { message: "Nenašli sa žiadne osoby" };        
    }).catch(e => {
        const code = e.status;            
        console.log(`🔴 Chyba pri získavaní osôb: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní osôb" }; 
    });
};
export const getSortedPersons = async (key: string) => {
    console.log(`🟡 Filtrujem všetky osoby podľa: ${key}`);
    return axios.get(`https://app.vzpieranie.sk:3002/api/person?sortBy=${key}`)
    .then(res => {
        const code = res.status;
        if(code >= 200 && code < 300) 
            if(Array.isArray(res.data)) return (res.data);          
        return { message: "Nenašli sa žiadne osoby" };
    }).catch(e => {
        const code = e.res.status;            
        console.log(`🔴 Chyba pri získavaní osôb: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní osôb" }; 
    })
};
export const createPerson = async (person: CreatePerson) => {
    console.log("🟡 Vytváram osobu s týmito údajmi: ", person);
    return axios.post('https://app.vzpieranie.sk:3002/api/person', person)
    .then(async res => {
        const code = res.status;
        if (code >= 200 && code < 300) return 1; 
    }).catch(e => {
        const code = e.status;            
        console.log(`🔴 Chyba pri vytváraní osoby: ${code}`);
        if(code >= 400 && code < 500) return 2;                      
        if(code >= 500) return 3;  
    });
}
export const updatePerson = async (id: number,person: EditPerson) => {
    console.log(`🟡 Upravujem osobu s týmito údajmi: ${JSON.stringify(person)}`);
    /* return axios.patch(`https://app.vzpieranie.sk:3002/api/person/${id}`, person)  */
    return axios.patch(`http://localhost:3002/api/person/${id}`, person)    
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
export const deletePerson = async (id: number) => {
    console.log(`🟡 Mažem osobu s ID: ${id}`);
    return axios.delete(`https://app.vzpieranie.sk:3002/api/person/${id}`)   
    .then(res => {
        const code = res.status;
        console.log(`Code: ${code}`);
        if(code >= 200 && code < 300) {
            console.log(`Tralala`);
            return 1;
        }
        return 2;                  
    }).catch(e => {
        console.log(`Response ${JSON.stringify(e)}`)
        const code = e.status;
        console.log(`Code: ${code}`);
        console.log(`🔴 Chyba pri mazaní osoby: ${code}`)
        if(code >= 400 && code < 500) return 2;  
        if(code === 500) return 3;  
        return 3;
    });
};

/* export const editClub = async (club: EditClub) => {
    console.log(`🟡 Editujem klub: ${club.name}`);
    return axios.patch(`https://app.vzpieranie.sk:3002/api/club/${club.id}`, club).then(async response => {
        const code = response.status;
        if(code === 201) return 1;           
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri vytváraní klubu: ${code}`);
        if(code >= 400 && code < 500) return 2;                                      
        if(code >= 500) return 3;             
    });                
}; */