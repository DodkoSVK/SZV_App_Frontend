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