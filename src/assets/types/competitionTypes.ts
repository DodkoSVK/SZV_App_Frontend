
export interface CompetitionLocation {
    id: number;
    group: string;
    city: string;
    club: number
}    
export interface Competition {
    id: number;
    league: string;
    round: string;
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
    league: 0,
    round: "",
    date: "",
    locations: [defaultCompetitionLocation]
}
export interface RawLocation {
    id: number;
    group: string;
    city: string;
    club_id: number;
}

export interface RawCompetition {
    id: number;
    name: string;
    round: string;
    date: string;
    array: RawLocation[];
}

export interface Leagues {
    id: number;
    name: string;
}
