import axios from "axios"
import type { FormData, WeekMenuResponse } from "../types"

const API_BASE = "http://localhost:3000"

export async function generateMenu(data: FormData): Promise<WeekMenuResponse> {
  const response = await axios.post(`${API_BASE}/api/generate-menu`, data)
  return response.data
}