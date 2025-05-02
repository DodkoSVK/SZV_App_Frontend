import axios  from "axios";

export const fetchData = async( url: string, label: string) => {
    console.log(`🟡 Načítavam všetky ${label}`);
    return axios.get(url).then(res => {        
        const code = res.status;        
        if(code >= 200 && code < 300) 
            if(Array.isArray(res.data)) return (res.data);            
        return { message: `Nenašli sa žiadne osoby ${label}`};     
    }).catch(e => {
        const code = e.res.status;          
        console.log(`🔴 Chyba pri získavaní dát pre ${label}: ${JSON.stringify(code)}`);
        if(code >= 400 && code < 500) return ({ message: "Nebolo možné načítať dáta"});                                     
        if(code >= 500) return ({ message: "Nebolo možné načítať dáta"});
        return { message: `Chyba pri získavaní dát pre ${label}` }; 
    });
}