import axios from 'axios';
//Types
import { CreateClub, EditClub } from '../assets/types/clubTypes';

//Getting clubs from DB
export const getClubs = async () => {
    console.log(`🟡 Načítavam všetky kluby`);
    return axios.get('https://app.vzpieranie.sk:3002/api/club').then(response => {      
        const code = response.status;
        if (code >= 200 && code < 300) {
            if(Array.isArray(response.data)) return (response.data);            
            else return ({ message: "Nenašli sa žiadne kluby"});
        }
        return { message: "Nenašli sa žiadne kluby" };                 
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri získavaní klubov: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní klubov" }; 
    });
};

//Getting sorted clubs from DB
export const getSortedClubs = async (key: string) => {    
    console.log(`🟡 Filtrujem všetky kluby podľa: ${key}`);
    return axios.get(`https://app.vzpieranie.sk:3002/api/club?sortBy=${key}`).then(response => {        
        const code = response.status;
        if (code >= 200 && code < 300) {
            if(Array.isArray(response.data)) return (response.data);            
            else return ({ message: "Nenašli sa žiadne kluby"});
        }
        return { message: "Chyba pri získavaní klubov" };         
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri získavaní klubu: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní klubov" };
    });
};
//Put new club to DB
export const createClub = async (club: CreateClub) => {
    console.log("🟡 Vytváram klub s týmito údajmi: ", club);
    return axios.post('https://app.vzpieranie.sk:3002/api/club', club).then(async response => {            
        const code = response.status;            
        if (code >= 200 && code < 300) return 1;                
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri vytváraní klubu: ${code}`);
        if(code >= 400 && code < 500) return 2;                      
        if(code >= 500) return 3;                             
    });
};
//Update an existing club in DB
export const editClub = async (club: EditClub) => {
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
};
//Remove an existing club from DB
export const deleteClub = async (id: number) => {
    console.log(`🟡 Mažem klub s ID: ${id}`);
    return axios.delete(`https://app.vzpieranie.sk:3002/api/club/${id}`).then(response => {
        const code = response.status;
        if(code === 200) return 1;
        if(code === 500) return 2;            
    });    
};