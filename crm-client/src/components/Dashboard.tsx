"use client"

import { useState, useEffect, useCallback } from "react"
import Sidebar from "./Sidebar"
import DashboardHome from "./DashboardHome"
import ServicesPage from "./ServicesPage"
import PortfolioPage from "./PortfolioPage"
import CareArticlesPage from "./CareArticlesPage"
import BlogPostsPage from "./BlogPostsPage"
import ClientsPage from "./ClientsPage"
import AppointmentsPage from "./AppointmentsPage"
import type { Service, PortfolioItem, CareArticle, BlogPost, Client, Appointment } from "../App"
import { servicesAPI, portfolioAPI, careAPI, blogAPI, clientsAPI, appointmentsAPI } from "../api-beauty"
import { useAuth } from "../context/AuthContext"

interface DashboardProps {
  onLogout?: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const { logout: authLogout } = useAuth()
  
  type PageType = "dashboard" | "services" | "portfolio" | "care" | "blog" | "clients" | "appointments"
  
  const getInitialPage = (): PageType => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      const validPages: PageType[] = ["dashboard", "services", "portfolio", "care", "blog", "clients", "appointments"]
      if (validPages.includes(hash as PageType)) {
        return hash as PageType
      }
    }
    return "dashboard"
  }
  
  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage())
  const [services, setServices] = useState<Service[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [careArticles, setCareArticles] = useState<CareArticle[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const updateHash = useCallback((page: PageType) => {
    if (typeof window !== 'undefined') {
      if (page === 'dashboard') {
        window.history.pushState(null, '', '#')
      } else {
        window.history.pushState(null, '', `#${page}`)
      }
    }
  }, [])
  
  const handlePageChange = useCallback((page: PageType) => {
    setCurrentPage(page)
    updateHash(page)
  }, [updateHash])
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getInitialPage())
    }
    
    window.addEventListener('popstate', handleHashChange)
    return () => window.removeEventListener('popstate', handleHashChange)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
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
        console.error("Error fetching data:", err)
        setError("Ошибка загрузки данных")
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const handleLogout = () => {
    authLogout()
    if (onLogout) onLogout()
  }

  // Services handlers
  const handleAddService = async (service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newService = await servicesAPI.create(service)
      setServices([newService, ...services])
    } catch (err) {
      console.error("Error adding service:", err)
      throw err
    }
  }

  const handleUpdateService = async (id: string, service: Partial<Service>) => {
    try {
      const updated = await servicesAPI.update(id, service)
      setServices(services.map(s => s._id === id ? updated : s))
    } catch (err) {
      console.error("Error updating service:", err)
      throw err
    }
  }

  const handleDeleteService = async (id: string) => {
    try {
      await servicesAPI.delete(id)
      setServices(services.filter(s => s._id !== id))
    } catch (err) {
      console.error("Error deleting service:", err)
      throw err
    }
  }

  // Portfolio handlers
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

  // Care handlers
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

  // Blog handlers
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

  // Clients handlers
  const handleAddClient = async (client: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newClient = await clientsAPI.create(client)
      setClients([newClient, ...clients])
    } catch (err) {
      console.error("Error adding client:", err)
      throw err
    }
  }

  const handleUpdateClient = async (id: string, client: Partial<Client>) => {
    try {
      const updated = await clientsAPI.update(id, client)
      setClients(clients.map(c => c._id === id ? updated : c))
    } catch (err) {
      console.error("Error updating client:", err)
      throw err
    }
  }

  const handleDeleteClient = async (id: string) => {
    try {
      await clientsAPI.delete(id)
      setClients(clients.filter(c => c._id !== id))
    } catch (err) {
      console.error("Error deleting client:", err)
      throw err
    }
  }

  // Appointments handlers
  const handleAddAppointment = async (appointment: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newAppointment = await appointmentsAPI.create(appointment)
      setAppointments([newAppointment, ...appointments])
    } catch (err) {
      console.error("Error adding appointment:", err)
      throw err
    }
  }

  const handleUpdateAppointment = async (id: string, appointment: Partial<Appointment>) => {
    try {
      const updated = await appointmentsAPI.update(id, appointment)
      setAppointments(appointments.map(a => a._id === id ? updated : a))
    } catch (err) {
      console.error("Error updating appointment:", err)
      throw err
    }
  }

  const handleDeleteAppointment = async (id: string) => {
    try {
      await appointmentsAPI.delete(id)
      setAppointments(appointments.filter(a => a._id !== id))
    } catch (err) {
      console.error("Error deleting appointment:", err)
      throw err
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar currentPage={currentPage} onNavigate={handlePageChange} onLogout={handleLogout} />
      <main
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "2rem",
          background: "var(--color-bg-light)",
          minHeight: "100vh",
        }}
      >
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)" }}>Загрузка...</p>
          </div>
        ) : error ? (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100%",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <p style={{ fontSize: "1.125rem", color: "#ef4444" }}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: "0.5rem 1rem",
                background: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                cursor: "pointer"
              }}
            >
              Обновить страницу
            </button>
          </div>
        ) : (
          <>
            {currentPage === "dashboard" && (
              <DashboardHome 
                services={services}
                portfolio={portfolio}
                careArticles={careArticles}
                blogPosts={blogPosts}
                clients={clients}
                appointments={appointments}
              />
            )}
            {currentPage === "services" && (
              <ServicesPage
                services={services}
                onAdd={handleAddService}
                onUpdate={handleUpdateService}
                onDelete={handleDeleteService}
              />
            )}
            {currentPage === "portfolio" && (
              <PortfolioPage
                items={portfolio}
                onAdd={handleAddPortfolio}
                onUpdate={handleUpdatePortfolio}
                onDelete={handleDeletePortfolio}
              />
            )}
            {currentPage === "care" && (
              <CareArticlesPage
                articles={careArticles}
                onAdd={handleAddCare}
                onUpdate={handleUpdateCare}
                onDelete={handleDeleteCare}
              />
            )}
            {currentPage === "blog" && (
              <BlogPostsPage
                posts={blogPosts}
                onAdd={handleAddBlog}
                onUpdate={handleUpdateBlog}
                onDelete={handleDeleteBlog}
              />
            )}
            {currentPage === "clients" && (
              <ClientsPage
                clients={clients}
                onAdd={handleAddClient}
                onUpdate={handleUpdateClient}
                onDelete={handleDeleteClient}
              />
            )}
            {currentPage === "appointments" && (
              <AppointmentsPage
                appointments={appointments}
                clients={clients}
                services={services}
                onAdd={handleAddAppointment}
                onUpdate={handleUpdateAppointment}
                onDelete={handleDeleteAppointment}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
