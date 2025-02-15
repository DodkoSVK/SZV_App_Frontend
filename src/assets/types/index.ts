export interface Club {
    id: number
    name: string
    city: string
    street: string
    postal: string
    ico: string
    mail: string
    tel: string
    f_name: string
    surname: string
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
    f_name: "",
    surname: ""
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