import { z } from "zod";

/* ------------------------ Base schemas ------------------------ */
export const baseLocationSchema = z.object({
    id: z.number(),
    group: z.string(),
    city: z.string(),
    club_id: z.number(),
    club_name: z.string(),
});

export const baseCompetitionSchema = z.object({
    id: z.number(),
    league_id: z.number(),
    league_name: z.string(),
    round: z.number(),
    date: z.date(),
    locations: z.array(baseLocationSchema),
});

export type Competition = z.infer<typeof baseCompetitionSchema>;
/* ------------------------ Default values schemas ------------------------ */

export const defaultLocationSchema = baseLocationSchema.partial().extend({
    id: z.number().default(0),
    group: z.string().default(""),
    city: z.string().default(""),
    club_id: z.number().default(0),
    club_name: z.string().default(""),
});

export const defaultCompetitionSchema = baseCompetitionSchema.partial().extend({
    id: z.number().default(0),
    league_id: z.number().default(0),
    league_name: z.string().default(""),
    round: z.number().default(1),
    date: z.date().default(new Date()),
    locations: z.array(defaultLocationSchema).default([
        defaultLocationSchema.parse({}),
    ]),
});

export type DefaultCompetition = z.input<typeof defaultCompetitionSchema>;

/* ------------------------ Creation schemas ------------------------ */

export const createLocationSchema = baseLocationSchema.omit({
    id: true,
    club_name: true,
}).extend({
    city: z.string().optional().default(""),
});

export const createCompetitionSchema = baseCompetitionSchema.omit({
    id: true,
    league_name: true,
}).extend({
    locations: z.array(createLocationSchema),
}); 

export type CreateCompetition = z.infer<typeof createCompetitionSchema>;

/* ------------------------ Edit schemas ------------------------ */
export const editLocationSchema = createLocationSchema.partial();
export const editCompetitionSchema = createCompetitionSchema.partial().extend({
    id: z.number(),
    locations: z.array(editLocationSchema).optional(), // voliteľné pole lokácií
});
export type EditCompetition = z.infer<typeof editCompetitionSchema>;

export interface Leagues {
    id: number;
    name: string;
}
