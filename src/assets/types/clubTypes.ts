/**
 * Club object
 */
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
/**
 * Edit club object with optional fields
 */
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
};
/**
 * Defeult values for club
 */
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
/**
 * Createclub object
 */
export interface CreateClub {
    name: string
    city: string
    street: string
    postal: string
    ico: string
    mail: string
    tel: string
}
