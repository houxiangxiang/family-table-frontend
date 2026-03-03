import { useState } from "react"
import type { FormData } from "../types"

interface Props {
  onSubmit: (data: FormData) => void
}

export default function MenuForm({ onSubmit }: Props) {
  const [form, setForm] = useState<FormData>({
    adults: 2,
    children: 0,
    cuisine: "",
    dietaryRestrictions: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === "adults" || name === "children"
        ? Number(value)
        : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow rounded">
      <div>
        <label>Adults</label>
        <input
          type="number"
          name="adults"
          value={form.adults}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Children</label>
        <input
          type="number"
          name="children"
          value={form.children}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Cuisine Preference</label>
        <input
          type="text"
          name="cuisine"
          value={form.cuisine}
          onChange={handleChange}
          placeholder="Chinese, Italian..."
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Dietary Restrictions</label>
        <input
          type="text"
          name="dietaryRestrictions"
          value={form.dietaryRestrictions}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Menu
      </button>
    </form>
  )
}