import { loginCredentials } from "@/assets/types/authTypes";
import { RegisterPerson } from "@/assets/types/personTypes";
import axios from "axios";

export const registerPerson = async (person: RegisterPerson) => {
    console.log("🟡 Vytváram login pre osobu: ", person);
    return axios.post('http://localhost:3002/api/auth/register', person)
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

export const loginPerson = async (credentials: loginCredentials) => {
    console.log("🟡 Prihlasujem osobu: ");
    return axios.post('http://localhost:3002/api/auth/login', credentials)
    .then(async res => {
        const code = res.status;
        console.log(`Response: ${JSON.stringify(res.data)}`);
        if (code >= 200 && code < 300) return 1; 
    }).catch(e => {
        const code = e.status;            
        console.log(`🔴 Chyba pri vytváraní osoby: ${code}`);
        if(code >= 400 && code < 500) return 2;                      
        if(code >= 500) return 3;  
    });
}

