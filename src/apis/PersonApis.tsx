import axios from "axios";

export const getPersons = async () => {
    console.log(`🟡 Načítavam všetky osoby`);
    return axios.get('https://app.vzpieranie.sk:3002/api/person').then(response => {        
        const code = response.status;
        if(code >= 200 && code < 300) {
            if(Array.isArray(response.data)) return (response.data);            
            else return({ message: "Nenašli sa žiadne osoby"});    
        }    
        return { message: "Nenašli sa žiadne osoby" };     
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri získavaní osôb: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní osôb" }; 
    });
};
export const getPersonByID = async (id: number) => {
    console.log(`🟡 Načítavam osobu`);
    return axios.get(`https://app.vzpieranie.sk:3002/api/person/${id}`).then(response => {    
        const code = response.status;
        if(code >= 200 && code < 300) {
            if(Array.isArray(response.data)) return (response.data);            
            else  return ({ message: "Nenašli sa žiadne osoby"});  
        } 
        return { message: "Nenašli sa žiadne osoby" };        
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri získavaní osôb: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní osôb" }; 
    });
};
export const getSortedPersons = async (key: string) => {
    console.log(`🟡 Filtrujem všetky osoby podľa: ${key}`);
    return axios.get(`https://app.vzpieranie.sk:3002/api/person?sortBy=${key}`).then(response => {
        const code = response.status;
        if(code >= 200 && code < 300) {
            if(Array.isArray(response.data)) return (response.data);            
            else  return ({ message: "Nenašli sa žiadne osoby"});  
        }         
        return { message: "Nenašli sa žiadne osoby" };
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri získavaní osôb: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní osôb" }; 
    })
};
