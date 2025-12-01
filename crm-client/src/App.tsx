"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import DashboardLayout from "./components/DashboardLayout"
import { AuthProvider, useAuth } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "./components/Toaster"
import { ToastProvider } from "../hooks/use-toast"
import DashboardRoute from "./routes/DashboardRoute"
import ServicesRoute from "./routes/ServicesRoute"
import PortfolioRoute from "./routes/PortfolioRoute"
import CareRoute from "./routes/CareRoute"
import BlogRoute from "./routes/BlogRoute"
import ClientsRoute from "./routes/ClientsRoute"
import AppointmentsRoute from "./routes/AppointmentsRoute"
import ContactsRoute from "./routes/ContactsRoute"

// Beauty Salon Types
export interface Service {
  _id: string
  title: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface PortfolioItem {
  _id: string
  type: string
  src: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface CareArticle {
  _id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  sidebarTips: string[]
  sidebarTimeText: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  _id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  _id: string
  name: string
  phone: string
  email?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  _id: string
  client: string | { _id: string; name: string; phone: string; email?: string }
  service: string | { _id: string; title: string; description: string }
  date: string
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt: string
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>Загрузка...</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
      } />
      
      <Route path="/" element={
        <ProtectedRoute requiredRole="admin">
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardRoute />} />
        <Route path="services" element={<ServicesRoute />} />
        <Route path="portfolio" element={<PortfolioRoute />} />
        <Route path="care" element={<CareRoute />} />
        <Route path="blog" element={<BlogRoute />} />
        <Route path="clients" element={<ClientsRoute />} />
        <Route path="appointments" element={<AppointmentsRoute />} />
        <Route path="contacts" element={<ContactsRoute />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
          <Toaster />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
