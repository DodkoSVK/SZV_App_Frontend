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
}
export interface EditClub {
    id: number
    name?: string
    city?: string
    street?: string
    postal?: string
    ico?: string
    mail?: string
    tel?: string
    chid?: number
    fname?: string
    sname?: string
}
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
export interface CreateClub {
    name: string
    city: string
    street: string
    postal: string
    ico: string
    mail: string
    tel: string
}
export interface openEditCreateUI {
    id: number,
    message: string
}
export interface Button {
    buttonName: string
    buttonText: string
}
export interface Alert {
    alertType: boolean
    alertMessage: string
}
export interface PersonSelect {
    id: number,
    fname: string,
    sname: string,
}
export interface Person {
    id: number,
    fname: string,
    sname: string,
    birth: string,
    club?: string
}