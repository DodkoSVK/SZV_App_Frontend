import axios from "axios";

export const getLeagues = async () => {
    console.log("🟡 Získavam všetky ligy");
    return axios.get('http://localhost:3002/api/league').then(response => {
        const code = response.status;
        if (code >= 200 && code < 300) {
            if(Array.isArray(response.data)) return (response.data);            
            else return ({ message: "Nenašli sa žiadne ligy"});
        }
        return { message: "Nenašli sa žiadne ligy" };                 
    }).catch(error => {
        const code = error.status;            
        console.log(`🔴 Chyba pri získavaní líg: ${code}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: "Chyba pri získavaní líg" }; 
    });
}