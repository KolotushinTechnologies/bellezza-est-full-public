import { useState, useEffect } from "react"
import BlogPostsPage from "../components/BlogPostsPage"
import type { BlogPost } from "../App"
import { blogAPI } from "../api-beauty"

export default function BlogRoute() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        const data = await blogAPI.getAll()
        setBlogPosts(data)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlogPosts()
  }, [])

  const handleAddBlog = async (post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPost = await blogAPI.create(post)
      setBlogPosts([newPost, ...blogPosts])
    } catch (err) {
      console.error("Error adding blog post:", err)
      throw err
    }
  }

  const handleUpdateBlog = async (id: string, post: Partial<BlogPost>) => {
    try {
      const updated = await blogAPI.update(id, post)
      setBlogPosts(blogPosts.map(b => b._id === id ? updated : b))
    } catch (err) {
      console.error("Error updating blog post:", err)
      throw err
    }
  }

  const handleDeleteBlog = async (id: string) => {
    try {
      await blogAPI.delete(id)
      setBlogPosts(blogPosts.filter(b => b._id !== id))
    } catch (err) {
      console.error("Error deleting blog post:", err)
      throw err
    }
  }

  return (
    <BlogPostsPage
      posts={blogPosts}
      onAdd={handleAddBlog}
      onUpdate={handleUpdateBlog}
      onDelete={handleDeleteBlog}
      isLoading={loading}
    />
  )
}
