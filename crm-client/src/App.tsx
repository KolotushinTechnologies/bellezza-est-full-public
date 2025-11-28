"use client"

import { useState, useEffect } from "react"
import LoginPage from "./components/LoginPage"
import Dashboard from "./components/Dashboard"
import { AuthProvider, useAuth } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

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
  title: string
  excerpt: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  _id: string
  slug: string
  title: string
  excerpt: string
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
  client: string
  service: string
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
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>(
    isAuthenticated ? 'dashboard' : 'login'
  )

  // Update view when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentView('dashboard')
    } else {
      setCurrentView('login')
    }
  }, [isAuthenticated])

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
    <>
      {currentView === 'login' ? (
        <LoginPage onLogin={() => setCurrentView('dashboard')} />
      ) : (
        <ProtectedRoute requiredRole="admin">
          <Dashboard onLogout={() => setCurrentView('login')} />
        </ProtectedRoute>
      )}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
