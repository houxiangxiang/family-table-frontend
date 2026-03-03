export interface FormData {
  adults: number
  children: number
  cuisine: string
  dietaryRestrictions?: string
}

export interface DayMenu {
  day: string
  breakfast: string
  lunch: string
  dinner: string
}

export interface WeekMenuResponse {
  weekMenu: DayMenu[]
}