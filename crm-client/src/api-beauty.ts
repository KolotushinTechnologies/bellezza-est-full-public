import type { Service, PortfolioItem, CareArticle, BlogPost, Client, Appointment } from './App'

const API_URL = 'http://localhost:8080/api'

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token')
}

// Helper function to create headers with auth
const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Services API
export const servicesAPI = {
  getAll: async (): Promise<Service[]> => {
    const response = await fetch(`${API_URL}/services`)
    const data = await response.json()
    return data.success ? data.data : []
  },

  getById: async (id: string): Promise<Service | null> => {
    const response = await fetch(`${API_URL}/services/${id}`)
    const data = await response.json()
    return data.success ? data.data : null
  },

  create: async (service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Promise<Service> => {
    const response = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(service)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  update: async (id: string, service: Partial<Service>): Promise<Service> => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(service)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
  }
}

// Portfolio API
export const portfolioAPI = {
  getAll: async (): Promise<PortfolioItem[]> => {
    const response = await fetch(`${API_URL}/portfolio`)
    const data = await response.json()
    return data.success ? data.data : []
  },

  create: async (item: Omit<PortfolioItem, '_id' | 'createdAt' | 'updatedAt'>): Promise<PortfolioItem> => {
    const response = await fetch(`${API_URL}/portfolio`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  update: async (id: string, item: Partial<PortfolioItem>): Promise<PortfolioItem> => {
    const response = await fetch(`${API_URL}/portfolio/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
  }
}

// Care Articles API
export const careAPI = {
  getAll: async (): Promise<CareArticle[]> => {
    const response = await fetch(`${API_URL}/care`)
    const data = await response.json()
    return data.success ? data.data : []
  },

  create: async (article: Omit<CareArticle, '_id' | 'createdAt' | 'updatedAt'>): Promise<CareArticle> => {
    const response = await fetch(`${API_URL}/care`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(article)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  update: async (id: string, article: Partial<CareArticle>): Promise<CareArticle> => {
    const response = await fetch(`${API_URL}/care/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(article)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/care/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
  }
}

// Blog API
export const blogAPI = {
  getAll: async (): Promise<BlogPost[]> => {
    const response = await fetch(`${API_URL}/blog`)
    const data = await response.json()
    return data.success ? data.data : []
  },

  create: async (post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
    const response = await fetch(`${API_URL}/blog`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(post)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  update: async (id: string, post: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(post)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
  }
}

// Clients API
export const clientsAPI = {
  getAll: async (): Promise<Client[]> => {
    try {
      const response = await fetch(`${API_URL}/clients`, {
        headers: getAuthHeaders()
      })
      if (!response.ok) {
        console.error('Failed to fetch clients:', response.status)
        return []
      }
      const data = await response.json()
      return data.success ? data.data : []
    } catch (error) {
      console.error('Error fetching clients:', error)
      return []
    }
  },

  create: async (client: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>): Promise<Client> => {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(client)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  update: async (id: string, client: Partial<Client>): Promise<Client> => {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(client)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
  }
}

// Appointments API
export const appointmentsAPI = {
  getAll: async (): Promise<Appointment[]> => {
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        headers: getAuthHeaders()
      })
      if (!response.ok) {
        console.error('Failed to fetch appointments:', response.status)
        return []
      }
      const data = await response.json()
      return data.success ? data.data : []
    } catch (error) {
      console.error('Error fetching appointments:', error)
      return []
    }
  },

  create: async (appointment: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> => {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointment)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  update: async (id: string, appointment: Partial<Appointment>): Promise<Appointment> => {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointment)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
  }
}

// Upload API
export const uploadAPI = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)

    const token = getAuthToken()
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: formData
    })

    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data.fileUrl
  }
}
