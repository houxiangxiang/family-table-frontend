import { useState } from "react"
import type { FormData } from "../types"

interface Props {
  onSubmit: (data: FormData) => void
}

const CUISINES = [
  "Chinese",
  "Italian",
  "Mexican",
  "Indian",
  "Japanese",
  "Thai",
  "Mediterranean",
  "American"
]

const DIETARY = [
  "Vegetarian",
  "Vegan",
  "Gluten Free",
  "Dairy Free",
  "Nut Allergy",
  "Low Carb"
]

export default function MenuForm({ onSubmit }: Props) {
  const [form, setForm] = useState<FormData>({
    adults: 2,
    children: 0,
    cuisine: [],
    dietaryRestrictions: []
  })

  const toggleCuisine = (cuisine: string) => {
    setForm(prev => {
      const exists = prev.cuisine.includes(cuisine)

      return {
        ...prev,
        cuisine: exists
          ? prev.cuisine.filter(c => c !== cuisine)
          : [...prev.cuisine, cuisine]
      }
    })
  }

  const toggleDietary = (item: string) => {
    setForm(prev => {
      const exists = prev.dietaryRestrictions.includes(item)

      return {
        ...prev,
        dietaryRestrictions: exists
          ? prev.dietaryRestrictions.filter(d => d !== item)
          : [...prev.dietaryRestrictions, item]
      }
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-8 border"
      >
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Weekly Menu Generator
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Generate a personalized weekly meal plan using AI
          </p>
        </div>

        {/* Family Size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Adults
            </label>

            <input
              type="number"
              name="adults"
              value={form.adults}
              onChange={handleNumberChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Children
            </label>

            <input
              type="number"
              name="children"
              value={form.children}
              onChange={handleNumberChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Cuisine Preference */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Cuisine Preference
          </label>

          <div className="flex flex-wrap gap-2 mt-2">
            {CUISINES.map(c => {
              const selected = form.cuisine.includes(c)

              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => toggleCuisine(c)}
                  className={`px-3 py-1 rounded-full text-sm border transition
                    ${selected
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                    }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Dietary Restrictions
          </label>

          <div className="flex flex-wrap gap-2 mt-2">
            {DIETARY.map(d => {
              const selected = form.dietaryRestrictions.includes(d)

              return (
                <button
                  type="button"
                  key={d}
                  onClick={() => toggleDietary(d)}
                  className={`px-3 py-1 rounded-full text-sm border transition
                    ${selected
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                    }`}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded-lg shadow"
        >
          Generate Weekly Menu
        </button>
      </form>
    </div>
  )
}