import { z } from "zod";

export const baseClubSchema = z.object({
    name: z.string().min(1, "Názov klubu je povinný údaj"),
    city: z.string().min(1, "Mesto je povinný údaj"),
    street: z.string().min(1, "Ulica je povinný údaj"),
    postal: z.string().min(1, "PSČ je povinný údaj"),
    ico: z.string().min(1, "IČO je povinný údaj"),
    tel: z.string().optional(),
    mail: z.string().email("Neplatný email").optional()
})
//Club type with optional fields
export const editClubSchema = baseClubSchema.partial();
export type EditClub = z.infer<typeof editClubSchema>;
//Club type without any options
export const createClubSchema = baseClubSchema;
export type CreateClub = z.infer<typeof createClubSchema>;

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

