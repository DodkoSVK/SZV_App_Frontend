//Club interface
export interface Club {
    id: number
    name: string
    city: string
    street: string
    postal: string
    ico: string
    mail: string
    tel: string
    chid: number
    fname: string
    sname: string
};
//Club interface with optional fields
export type EditClub = Partial<Club>
//Club interface without any options
export type CreateClub = Omit<Club, "id" | "chid" | "fname" | "sname">

//Club interface with initial values
export const defaultClub: Club = {
    id: 0,
    name: "",
    city: "",
    street: "",
    postal: "",
    ico: "",
    mail: "",
    tel: "",
    chid: 0,
    fname: "",
    sname: ""
};

