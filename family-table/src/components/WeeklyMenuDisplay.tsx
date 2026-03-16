import { useState, useMemo } from "react";
import type { DayMenu } from "../types";

interface Props {
  weekMenu: DayMenu[];
  loading?: boolean;
}

export default function WeeklyMenuDisplay({
  weekMenu,
  loading = false,
}: Props) {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleSelectDay = (index: number) => {
    setSelectedIndex(index);
    setShowRecipe(false);
  };

  const selectedDay = weekMenu[selectedIndex];

  /**
   * Merge ingredients into weekly shopping list
   */
  const shoppingList = useMemo(() => {
    const map = new Map<string, string[]>();

    weekMenu.forEach((day) => {
      day.ingredients.forEach((ing) => {
        if (!map.has(ing.ingredient)) {
          map.set(ing.ingredient, []);
        }
        map.get(ing.ingredient)!.push(ing.quantity);
      });
    });

    return Array.from(map.entries()).map(([name, qty]) => ({
      ingredient: name,
      quantity: qty.join(" + "),
    }));
  }, [weekMenu]);

  if (loading) {
    return (
      <div className="mt-8 p-6 border rounded animate-pulse">
        <div className="h-6 bg-gray-200 w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">

      {/* Main Card */}
      <div className="flex border rounded-xl shadow-md overflow-hidden">

        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r">
          {weekMenu.map((day, index) => (
            <button
              key={day.day}
              onClick={() => handleSelectDay(index)}
              className={`block w-full text-left px-4 py-3 border-b transition
                hover:bg-gray-100
                ${index === selectedIndex ? "bg-white font-semibold" : ""}
              `}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Day Detail */}
        <div className="flex-1 p-6">

          {selectedDay && (
            <>
              <h2 className="text-2xl font-bold mb-2">{selectedDay.day}</h2>

              {selectedDay.image && (
                <img
                  src={selectedDay.image}
                  alt={selectedDay.dish}
                  className="w-full max-w-lg rounded-xl shadow mb-4"
                />
              )}

              <p className="text-xl font-semibold">{selectedDay.dish}</p>

              {/* Cuisine Badge */}
              <div className="mt-1 mb-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {selectedDay.cuisine}
                </span>
              </div>

              <p className="text-gray-700">{selectedDay.description}</p>

              {/* Nutrition */}
              <div className="mt-5">
                <strong className="text-lg">Nutrition</strong>

                <div className="grid grid-cols-2 gap-3 mt-3 text-sm">

                  <div className="border p-3 rounded-lg bg-gray-50">
                    🔥 Calories: {selectedDay.nutrition.calories} kcal
                  </div>

                  <div className="border p-3 rounded-lg bg-gray-50">
                    💪 Protein: {selectedDay.nutrition.protein}
                  </div>

                  <div className="border p-3 rounded-lg bg-gray-50">
                    🍞 Carbs: {selectedDay.nutrition.carbs}
                  </div>

                  <div className="border p-3 rounded-lg bg-gray-50">
                    🥑 Fat: {selectedDay.nutrition.fat}
                  </div>

                </div>
              </div>

              {/* Ingredients */}
              <div className="mt-5">
                <strong className="text-lg">Ingredients</strong>

                <ul className="list-disc list-inside mt-2 space-y-1">
                  {selectedDay.ingredients.map((ing, idx) => (
                    <li key={idx}>
                      {ing.ingredient} — {ing.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recipe Toggle */}
              {selectedDay.recipe && (
                <div className="mt-6">

                  <button
                    onClick={() => setShowRecipe(!showRecipe)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    {showRecipe ? "Hide Recipe ▲" : "View Recipe ▼"}
                  </button>

                  {showRecipe && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">

                      <strong className="text-lg">Recipe</strong>

                      <ol className="list-decimal list-inside mt-2 space-y-2">
                        {selectedDay.recipe.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>

                    </div>
                  )}

                </div>
              )}

            </>
          )}
        </div>
      </div>

      {/* Weekly Shopping List */}
      <div className="p-6 border rounded-xl shadow-sm">

        <h2 className="text-xl font-bold mb-3">
          🛒 Weekly Shopping List
        </h2>

        <ul className="grid grid-cols-2 gap-3">

          {shoppingList.map((item, idx) => (
            <li
              key={idx}
              className="border p-3 rounded-lg bg-gray-50"
            >
              {item.ingredient} — {item.quantity}
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}