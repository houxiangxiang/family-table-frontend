import { useState, useMemo } from "react"
import type { DayMenu } from "../types"

interface Props {
  weekMenu: DayMenu[]
  onRegenerate?: () => void
  loading?: boolean
}

export default function WeeklyMenuDisplay({
  weekMenu,
  onRegenerate,
  loading = false
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedDay = weekMenu[selectedIndex]

  /**
   * Merge ingredients into a weekly shopping list
   */
  const shoppingList = useMemo(() => {
    const map = new Map<string, string[]>()

    weekMenu.forEach(day => {
      day.ingredients.forEach(ing => {
        if (!map.has(ing.ingredient)) {
          map.set(ing.ingredient, [])
        }
        map.get(ing.ingredient)!.push(ing.quantity)
      })
    })

    return Array.from(map.entries()).map(([name, qty]) => ({
      ingredient: name,
      quantity: qty.join(" + ")
    }))
  }, [weekMenu])

  if (loading) {
    return (
      <div className="mt-8 p-6 border rounded animate-pulse">
        <div className="h-6 bg-gray-200 w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">

      {/* Regenerate button */}
      <div className="flex justify-end">
        <button
          onClick={onRegenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Regenerate Menu
        </button>
      </div>

      <div className="flex border rounded shadow-sm overflow-hidden">

        {/* Left Sidebar */}
        <div className="w-48 bg-gray-50 border-r">
          {weekMenu.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setSelectedIndex(index)}
              className={`block w-full text-left px-4 py-3 border-b hover:bg-gray-100
                ${index === selectedIndex ? "bg-white font-bold" : ""}
              `}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Day Menu */}
        <div className="flex-1 p-6">

          {selectedDay && (
            <>
              <h2 className="text-xl font-bold mb-2">{selectedDay.day}</h2>

              <p className="text-lg font-semibold">{selectedDay.dish}</p>

              {/* Cuisine Tag */}
              <div className="mt-1 mb-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {selectedDay.cuisine}
                </span>
              </div>

              <p className="text-gray-700">
                {selectedDay.description}
              </p>

              <div className="mt-4">
                <strong>Ingredients</strong>
                <ul className="list-disc list-inside mt-2">
                  {selectedDay.ingredients.map((ing, idx) => (
                    <li key={idx}>
                      {ing.ingredient} - {ing.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Weekly Shopping List */}
      <div className="p-6 border rounded shadow-sm">
        <h2 className="text-xl font-bold mb-3">
          Weekly Shopping List
        </h2>

        <ul className="grid grid-cols-2 gap-2">
          {shoppingList.map((item, idx) => (
            <li
              key={idx}
              className="border p-2 rounded bg-gray-50"
            >
              {item.ingredient} — {item.quantity}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}