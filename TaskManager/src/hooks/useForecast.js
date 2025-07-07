// src/hooks/useForecast.js
import { useState, useEffect } from 'react'
import { fetchForecastByCoords } from '../api/weather'

export function useForecast() {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchForecastByCoords(
            position.coords.latitude,
            position.coords.longitude
          )
          setForecast(data)
        } catch (err) {
          setError('Failed to fetch forecast')
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError('Location access denied for forecast')
        setLoading(false)
      }
    )
  }, [])

  return { forecast, loading, error }
}