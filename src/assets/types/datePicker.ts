export interface SelectingDate {
    year?: boolean
    month?:boolean
    date?: boolean
}
export interface SelectedDate {
    year: number,
    month: number,    
    day: number    
}
export interface DateInformation {
    monthName: string,
    totalDays: number[],
    weeks: number[][]
}
export interface DayObject {
    day: number,
    isCurrentMonth: boolean
}