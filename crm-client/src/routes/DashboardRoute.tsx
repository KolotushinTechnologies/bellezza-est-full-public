import { useState, useEffect } from "react"
import DashboardHome from "../components/DashboardHome"
import type { Service, PortfolioItem, CareArticle, BlogPost, Client, Appointment } from "../App"
import { servicesAPI, portfolioAPI, careAPI, blogAPI, clientsAPI, appointmentsAPI } from "../api-beauty"

export default function DashboardRoute() {
  const [services, setServices] = useState<Service[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [careArticles, setCareArticles] = useState<CareArticle[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [servicesData, portfolioData, careData, blogData, clientsData, appointmentsData] = await Promise.all([
          servicesAPI.getAll(),
          portfolioAPI.getAll(),
          careAPI.getAll(),
          blogAPI.getAll(),
          clientsAPI.getAll(),
          appointmentsAPI.getAll()
        ])
        
        setServices(servicesData)
        setPortfolio(portfolioData)
        setCareArticles(careData)
        setBlogPosts(blogData)
        setClients(clientsData)
        setAppointments(appointmentsData)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)" }}>Загрузка...</p>
      </div>
    )
  }

  return (
    <DashboardHome 
      services={services}
      portfolio={portfolio}
      careArticles={careArticles}
      blogPosts={blogPosts}
      clients={clients}
      appointments={appointments}
      isLoading={loading}
    />
  )
}
