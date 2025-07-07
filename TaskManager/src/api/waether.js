// src/api/weather.js
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// 🌤️ Current weather by coordinates
export async function fetchCurrentWeatherByCoords(lat, lon) {
  const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch current weather')
  return res.json()
}

// 📅 5-day forecast (3-hour intervals)
export async function fetchForecastByCoords(lat, lon) {
  const res = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch forecast')
  return res.json()
}