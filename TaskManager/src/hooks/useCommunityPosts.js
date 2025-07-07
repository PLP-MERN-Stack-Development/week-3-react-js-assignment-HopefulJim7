// src/hooks/useCommunityPosts.js
import { useEffect, useState } from 'react'
import { fetchCommunityPosts } from '../api/posts'

export function useCommunityPosts(limit = 5) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCommunityPosts(limit)
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => {
        setError('⚠️ Failed to load community posts')
        setLoading(false)
      })
  }, [limit])

  return { posts, loading, error }
}