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
    date: string;
}
    
    export interface Competition {
    id: number;
    league: string;
    round: string;
    locations: CompetitionLocation[];
}