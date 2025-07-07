// src/pages/Community.jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { useCommunityPosts } from '../hooks/useCommunityPosts'

export default function Community() {
  const { posts, loading, error } = useCommunityPosts(6)

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
        🌍 Farmer Community Posts
      </h1>

      {loading && <p className="text-gray-500">📡 Loading community posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="capitalize">{post.title}</CardTitle>
                <CardDescription>Shared by user #{post.userId}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300">{post.body}</p>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Post #{post.id}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}