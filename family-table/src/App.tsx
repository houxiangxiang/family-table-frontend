import { useState } from "react"
import MenuForm from "./components/MenuForm"
import WeeklyMenuDisplay from "./components/WeeklyMenuDisplay"
import LoadingSpinner from "./components/LoadingSpinner"
import type { FormData, WeekMenuResponse } from "./types"
import { generateMenu } from "./services/api"

function App() {
  const [menu, setMenu] = useState<WeekMenuResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (data: FormData) => {
    try {
      setLoading(true)
      const result = await generateMenu(data)
      setMenu(result)
    } catch (error) {
      console.error(error)
      alert("Failed to generate menu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        🍽 Family Table
      </h1>

      <MenuForm onSubmit={handleGenerate} />

      {loading && <LoadingSpinner />}

      {menu && !loading && (
        <WeeklyMenuDisplay weekMenu={menu.response.weekly_menu} />
      )}
    </div>
  )
}

export default App