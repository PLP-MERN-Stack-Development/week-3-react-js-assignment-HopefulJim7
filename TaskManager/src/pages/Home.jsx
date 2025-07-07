// src/pages/Home.jsx
import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export default function Home() {
  const [count, setCount] = useState(0)
  const [weather, setWeather] = useState(null)
  const [task, setTask] = useState('')
  const [advice, setAdvice] = useState('')
  const [todos, setTodos] = useState([])

  // 🌍 Fetch geolocation weather
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
          )
          const data = await res.json()
          setWeather(data)
        } catch {
          console.warn('Failed to fetch weather')
        }
      },
      () => console.warn('Location permission denied')
    )
  }, [])

  // 📋 Task advice logic
  useEffect(() => {
    if (task && weather) {
      const rain = weather?.rain?.['1h'] || 0
      const temp = weather?.main?.temp || 0
      const wind = weather?.wind?.speed || 0

      if (task.toLowerCase().includes('plant') && rain > 1) {
        setAdvice('✅ Good time to plant — rain is expected')
      } else if (task.toLowerCase().includes('harvest') && rain < 1) {
        setAdvice('🌤️ Dry weather — good for harvesting')
      } else if (task.toLowerCase().includes('spray') && wind > 15) {
        setAdvice('⚠️ Too windy — spraying may drift')
      } else {
        setAdvice('ℹ️ Weather looks suitable — proceed as planned')
      }
    } else {
      setAdvice('')
    }
  }, [task, weather])

  // 📝 Sample tasks (JSONPlaceholder)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then(setTodos)
      .catch(() => console.warn('Failed to fetch sample tasks'))
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      {/* Counter */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">🔢 Simple Counter</h2>
        <div className="flex items-center gap-4">
          <button onClick={() => setCount(c => c - 1)} className="px-4 py-2 bg-red-500 text-white rounded">-</button>
          <span className="text-xl font-bold">{count}</span>
          <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-green-500 text-white rounded">+</button>
        </div>
      </div>

      {/* Weather Info */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🌦️ Current Weather</h2>
        {weather ? (
          <div>
            <p><strong>Location:</strong> {weather.name}</p>
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Condition:</strong> {weather.weather[0].main}</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>📡 Fetching weather...</p>
        )}
      </div>

      {/* Task Input + Advice */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📋 Plan a Task</h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          placeholder="e.g. Plant maize, Harvest beans, Spray pesticides"
        />
        {advice && (
          <p className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold">
            {advice}
          </p>
        )}
      </div>

      {/* Sample Tasks */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🧪 Sample Agro Tasks</h2>
        <ul className="list-disc list-inside space-y-2">
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title} {todo.completed ? '✅' : '⏳'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}