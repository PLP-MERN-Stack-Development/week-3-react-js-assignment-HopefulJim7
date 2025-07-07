// src/hooks/useWeather.js
import { useState, useEffect } from 'react'
import { fetchCurrentWeatherByCoords } from '../api/weather'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchCurrentWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          )
          setWeather(data)
        } catch (err) {
          setError('Failed to fetch weather')
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError('Location permission denied')
        setLoading(false)
      }
    )
  }, [])

  return { weather, loading, error }
}