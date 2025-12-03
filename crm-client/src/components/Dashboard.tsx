"use client"

import { useState, useEffect } from "react"
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
  
  const [currentPage] = useState<PageType>(getInitialPage())
  const [services, setServices] = useState<Service[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [careArticles, setCareArticles] = useState<CareArticle[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loadingStates, setLoadingStates] = useState({
    services: false,
    portfolio: false,
    care: false,
    blog: false,
    clients: false,
    appointments: false,
    dashboard: false
  })
  const [error, setError] = useState<string | null>(null)

  

  // Fetch data based on current page
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setError(null)
        
        switch (currentPage) {
          case 'dashboard':
            // For dashboard, load all data
            if (!loadingStates.dashboard) {
              setLoadingStates(prev => ({ ...prev, dashboard: true }))
              const [servicesData, portfolioData, careData, blogData, clientsData, appointmentsData] = await Promise.all([
                services.length === 0 ? servicesAPI.getAll() : Promise.resolve(services),
                portfolio.length === 0 ? portfolioAPI.getAll() : Promise.resolve(portfolio),
                careArticles.length === 0 ? careAPI.getAll() : Promise.resolve(careArticles),
                blogPosts.length === 0 ? blogAPI.getAll() : Promise.resolve(blogPosts),
                clients.length === 0 ? clientsAPI.getAll() : Promise.resolve(clients),
                appointments.length === 0 ? appointmentsAPI.getAll() : Promise.resolve(appointments)
              ])
              setServices(servicesData)
              setPortfolio(portfolioData)
              setCareArticles(careData)
              setBlogPosts(blogData)
              setClients(clientsData)
              setAppointments(appointmentsData)
              setLoadingStates(prev => ({ ...prev, dashboard: false }))
            }
            break
            
          case 'services':
            if (services.length === 0 && !loadingStates.services) {
              setLoadingStates(prev => ({ ...prev, services: true }))
              const data = await servicesAPI.getAll()
              setServices(data)
              setLoadingStates(prev => ({ ...prev, services: false }))
            }
            break
            
          case 'portfolio':
            if (portfolio.length === 0 && !loadingStates.portfolio) {
              setLoadingStates(prev => ({ ...prev, portfolio: true }))
              const data = await portfolioAPI.getAll()
              setPortfolio(data)
              setLoadingStates(prev => ({ ...prev, portfolio: false }))
            }
            break
            
          case 'care':
            if (careArticles.length === 0 && !loadingStates.care) {
              setLoadingStates(prev => ({ ...prev, care: true }))
              const data = await careAPI.getAll()
              setCareArticles(data)
              setLoadingStates(prev => ({ ...prev, care: false }))
            }
            break
            
          case 'blog':
            if (blogPosts.length === 0 && !loadingStates.blog) {
              setLoadingStates(prev => ({ ...prev, blog: true }))
              const data = await blogAPI.getAll()
              setBlogPosts(data)
              setLoadingStates(prev => ({ ...prev, blog: false }))
            }
            break
            
          case 'clients':
            if (clients.length === 0 && !loadingStates.clients) {
              setLoadingStates(prev => ({ ...prev, clients: true }))
              const data = await clientsAPI.getAll()
              setClients(data)
              setLoadingStates(prev => ({ ...prev, clients: false }))
            }
            break
            
          case 'appointments':
            // Appointments page needs clients and services too
            if (!loadingStates.appointments) {
              setLoadingStates(prev => ({ ...prev, appointments: true }))
              const promises = []
              if (appointments.length === 0) promises.push(appointmentsAPI.getAll())
              if (clients.length === 0) promises.push(clientsAPI.getAll())
              if (services.length === 0) promises.push(servicesAPI.getAll())
              
              if (promises.length > 0) {
                const results = await Promise.all([
                  appointments.length === 0 ? appointmentsAPI.getAll() : Promise.resolve(appointments),
                  clients.length === 0 ? clientsAPI.getAll() : Promise.resolve(clients),
                  services.length === 0 ? servicesAPI.getAll() : Promise.resolve(services)
                ])
                setAppointments(results[0])
                setClients(results[1])
                setServices(results[2])
              }
              setLoadingStates(prev => ({ ...prev, appointments: false }))
            }
            break
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Ошибка загрузки данных")
        setLoadingStates(prev => ({ ...prev, [currentPage]: false }))
      }
    }
    
    fetchPageData()
  }, [currentPage])

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
      <Sidebar onLogout={handleLogout} />
      <main
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "2rem",
          background: "var(--color-bg-light)",
          minHeight: "100vh",
        }}
      >
        {error ? (
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
                isLoading={loadingStates.services}
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
