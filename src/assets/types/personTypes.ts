import { z } from "zod";

export const basePersonSchema = z.object({
    id: z.number(),
    fname: z.string().min(1, "Meno je povinný údaj"),
    sname: z.string().min(1, "Priezvisko je povinný údaj"),
    birth: z.coerce.date().min(new Date("1900-01-01"), "Dátum je povinný údaj"),
    club_id: z.union([z.number().min(1, "Vyberte iný klub"), z.literal(0)]).optional(),
    club_name: z.string()
})
// Person Schema and Type with optional fields
export const editPersonSchema = basePersonSchema.partial().omit({ club_name: true });
export type EditPerson = z.infer<typeof editPersonSchema>;
// Person Schema and Type without any options
export const createPersonSchema = basePersonSchema.omit({ club_name: true }).partial({ id: true});
export type CreatePerson = z.infer<typeof createPersonSchema>;
// Club Schema and Type with default values
export const defaultPersonSchcema = z.object({
    id: z.number().default(0),
    fname: z.string().default(""),
    sname: z.string().default(""),
    birth: z.coerce.date().default(new Date()),
    club_id: z.number().default(0),
    club_name: z.string().default("")
});
export type DefaultPerson = z.input<typeof defaultPersonSchcema>;
// Person interface 
export interface Person {
    id: number
    fname: string
    sname: string
    birth: Date
    club_id: number
    club_name: string
}



