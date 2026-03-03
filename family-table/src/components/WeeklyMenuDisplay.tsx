import type { DayMenu } from "../types"

interface Props {
  weekMenu: DayMenu[]
}

export default function WeeklyMenuDisplay({ weekMenu }: Props) {
  return (
    <div className="mt-8 space-y-6">
      {weekMenu.map(day => (
        <div key={day.day} className="p-4 border rounded shadow-sm">
          <h2 className="font-bold text-lg">{day.day}</h2>
          <p><strong>Breakfast:</strong> {day.breakfast}</p>
          <p><strong>Lunch:</strong> {day.lunch}</p>
          <p><strong>Dinner:</strong> {day.dinner}</p>
        </div>
      ))}
    </div>
  )
}