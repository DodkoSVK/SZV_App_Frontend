import { z } from "zod";

export const baseClubSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Názov klubu je povinný údaj"),
    city: z.string().min(1, "Mesto je povinný údaj"),               
    street: z.string().min(1, "Ulica je povinný údaj"),
    postal: z.string().min(1, "PSČ je povinný údaj"),
    ico: z.string().min(1, "IČO je povinný údaj"),
    tel: z.string().optional(),
    mail: z.string().email("Neplatný email").or(z.literal("")).optional(),
    chairman: z.union([z.number().min(1, "Vyberte iného štatutáta"), z.literal(0)]).optional()
});

//Club type with optional fields
export const editClubSchema = baseClubSchema.partial();
export type EditClub = z.infer<typeof editClubSchema>;
//Club type without any options
export const createClubSchema = baseClubSchema.partial({ id: true });
export type CreateClub = z.infer<typeof createClubSchema>;

export const defaultableClubSchema = z.object({
    id: z.number().default(0),
    name: z.string().default(""),
    city: z.string().default(""),
    street: z.string().default(""),
    postal: z.string().default(""),
    ico: z.string().default(""),
    tel: z.string().default(""),
    mail: z.string().default(""),
    chairman: z.number().default(0)
});
export type DefaultClub = z.input<typeof defaultableClubSchema>;

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

