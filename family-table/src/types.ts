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

export interface Nutrition {
  calories: number
  protein: string
  carbs: string
  fat: string
}

export interface DayMenu {
  day: string
  dish: string
  cuisine: string
  description: string
  ingredients: Ingredient[]
  nutrition: Nutrition
  image?: string
}

export interface WeekMenuResponse {
  response: {
    weekly_menu: DayMenu[]
  }
}