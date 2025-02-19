export interface PersonSelect {
    id: number,
    fname: string,
    sname: string,
    club: string
}
export interface Person {
    id: number,
    fname: string,
    sname: string,
    birth: string,
    club?: string
}
export const defaultPerson: Person = {
    id: 0,
    fname: "",
    sname: "",
    birth: "",
    club: "",    
};