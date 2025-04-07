
/* export interface Competition {
    id: number,
    league: string,
    group: string,
    city: string,
    date: string,
    round: number
} */
export interface CompetitionLocation {
    id: number;
    group: string;
    city: string;
    club: number
}
    
export interface Competition {
    id: number;
    league: number;
    round: string;
    date: string;
    locations: CompetitionLocation[];
}
export const defaultCompetition: Competition = {
    id: 0,
    league: 0,
    round: "",
    date: "",
    locations: []
}
export interface Leagues {
    id: number;
    name: string;
}
