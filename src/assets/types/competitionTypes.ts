import { z } from "zod";

// Competition Location base scheme 
export const baseCompetitionLocationSchema = z.object({
    id: z.number(),
    group: z.string().min(1, "Názov skupiny je povinný"),
    city: z.string().min(1, "Miesto súťaže je povinné"),
    club_id: z.union([z.number().min(1, "Vyberte iný klub"), z.literal(0)]).optional()
});
// Competition base scheme
export const baseCompetitionSchema = z.object({
    id: z.number(),
    league_id: z.union([z.number().min(1, "Vyberte inú ligu"), z.literal(0)]).optional(),
    round: z.number().min(1, "Kolko je povinný údaj"),
    date: z.coerce.date().min(new Date("2025-01-01"), "Dátum je povinný údaj"),
    locations: z.array(baseCompetitionLocationSchema)
});
// Edit CompetitionLocation schema and types
export const editCompetitionLocationSchema = baseCompetitionLocationSchema.partial();
export type EditCompetitionLocation = z.infer<typeof editCompetitionLocationSchema>;
// Edit Competition schema and types
export const editCompetitionSchema = baseCompetitionSchema.partial();
export type EditCompetition = z.infer<typeof editCompetitionSchema>;
// Competition Locations default type and schema with default values
export const defaultCompetitionLocationSchema = z.object({
    id: z.number().default(0),
    group: z.string().default(""),
    city: z.string().default(""),
    club_id: z.number().default(0)
});
export type DefaultCompetitionlocation = z.input<typeof defaultCompetitionLocationSchema>;
//Competition default type and schema with default values
export const defaultCompetitionSchema = z.object({
    id: z.number().default(0),
    league_id: z.number().default(0),
    round: z.number().default(1),
    date: z.coerce.date().min(new Date()),
    locations: z.array(defaultCompetitionLocationSchema)
});
export type DefaultCompetition = z.input<typeof defaultCompetitionSchema>;

export interface CompetitionLocation {
    id: number;
    group: string;
    city: string;
    club: number
}    
export interface Competition {
    id: number;
    league: string;
    round: number;
    date: string;
    locations: CompetitionLocation[];
}

export interface Leagues {
    id: number;
    name: string;
}
