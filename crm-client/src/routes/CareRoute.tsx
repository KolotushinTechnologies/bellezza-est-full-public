import { useState, useEffect } from "react"
import CareArticlesPage from "../components/CareArticlesPage"
import type { CareArticle } from "../App"
import { careAPI } from "../api-beauty"

export default function CareRoute() {
  const [careArticles, setCareArticles] = useState<CareArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCareArticles = async () => {
      try {
        setLoading(true)
        const data = await careAPI.getAll()
        setCareArticles(data)
      } catch (err) {
        console.error("Error fetching care articles:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCareArticles()
  }, [])

  const handleAddCare = async (article: Omit<CareArticle, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newArticle = await careAPI.create(article)
      setCareArticles([newArticle, ...careArticles])
    } catch (err) {
      console.error("Error adding care article:", err)
      throw err
    }
  }

  const handleUpdateCare = async (id: string, article: Partial<CareArticle>) => {
    try {
      const updated = await careAPI.update(id, article)
      setCareArticles(careArticles.map(c => c._id === id ? updated : c))
    } catch (err) {
      console.error("Error updating care article:", err)
      throw err
    }
  }

  const handleDeleteCare = async (id: string) => {
    try {
      await careAPI.delete(id)
      setCareArticles(careArticles.filter(c => c._id !== id))
    } catch (err) {
      console.error("Error deleting care article:", err)
      throw err
    }
  }

  return (
    <CareArticlesPage
      articles={careArticles}
      onAdd={handleAddCare}
      onUpdate={handleUpdateCare}
      onDelete={handleDeleteCare}
      isLoading={loading}
    />
  )
}
