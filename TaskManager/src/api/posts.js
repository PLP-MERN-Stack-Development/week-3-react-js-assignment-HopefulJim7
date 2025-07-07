// src/api/posts.js

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchCommunityPosts(limit = 5) {
  const res = await fetch(`${BASE_URL}/posts?_limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch community posts')
  return res.json()
}