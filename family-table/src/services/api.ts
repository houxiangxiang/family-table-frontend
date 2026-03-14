import axios from "axios"
import type { FormData, WeekMenuResponse } from "../types"

const API_BASE = "https://2s0vv2h3za.execute-api.us-east-1.amazonaws.com"

export async function generateMenu(data: FormData): Promise<WeekMenuResponse> {
  const response = await axios.post(`${API_BASE}/dev/dishes`, data)
  return response.data
}