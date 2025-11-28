import { useState, useEffect } from "react"
import PortfolioPage from "../components/PortfolioPage"
import type { PortfolioItem } from "../App"
import { portfolioAPI } from "../api-beauty"

export default function PortfolioRoute() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true)
        const data = await portfolioAPI.getAll()
        setPortfolio(data)
      } catch (err) {
        console.error("Error fetching portfolio:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPortfolio()
  }, [])

  const handleAddPortfolio = async (item: Omit<PortfolioItem, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newItem = await portfolioAPI.create(item)
      setPortfolio([newItem, ...portfolio])
    } catch (err) {
      console.error("Error adding portfolio:", err)
      throw err
    }
  }

  const handleUpdatePortfolio = async (id: string, item: Partial<PortfolioItem>) => {
    try {
      const updated = await portfolioAPI.update(id, item)
      setPortfolio(portfolio.map(p => p._id === id ? updated : p))
    } catch (err) {
      console.error("Error updating portfolio:", err)
      throw err
    }
  }

  const handleDeletePortfolio = async (id: string) => {
    try {
      await portfolioAPI.delete(id)
      setPortfolio(portfolio.filter(p => p._id !== id))
    } catch (err) {
      console.error("Error deleting portfolio:", err)
      throw err
    }
  }

  return (
    <PortfolioPage
      items={portfolio}
      onAdd={handleAddPortfolio}
      onUpdate={handleUpdatePortfolio}
      onDelete={handleDeletePortfolio}
      isLoading={loading}
    />
  )
}
