
export interface CompetitionLocation {
    id: number;
    group: string;
    city: string;
    club: number
}    
export interface Competition {
    id: number;
    league: string;
    round: number | "";
    date: string;
    locations: CompetitionLocation[];
}
export const defaultCompetitionLocation: CompetitionLocation = {
    id: 0,
    group: "",
    city: "",
    club: 0
}
export const defaultCompetition: Competition = {
    id: 0,
    league: "",
    round: "",
    date: "",
    locations: []
}

export interface Leagues {
    id: number;
    name: string;
}
