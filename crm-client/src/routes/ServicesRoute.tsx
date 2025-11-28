import { useState, useEffect } from "react"
import ServicesPage from "../components/ServicesPage"
import type { Service } from "../App"
import { servicesAPI } from "../api-beauty"

export default function ServicesRoute() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const data = await servicesAPI.getAll()
        setServices(data)
      } catch (err) {
        console.error("Error fetching services:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchServices()
  }, [])

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

  return (
    <ServicesPage
      services={services}
      onAdd={handleAddService}
      onUpdate={handleUpdateService}
      onDelete={handleDeleteService}
      isLoading={loading}
    />
  )
}
