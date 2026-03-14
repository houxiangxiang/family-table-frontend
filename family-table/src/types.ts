export interface FormData {
  adults: number
  children: number
  cuisine: string[]
  dietaryRestrictions: string[]
}

export interface Ingredient {
  ingredient: string
  quantity: string
}

export interface DayMenu {
  day: string
  dish: string
  cuisine: string
  description: string
  ingredients: Ingredient[]
}

export interface WeekMenuResponse {
  response: {
    weekly_menu: DayMenu[]
  }
}