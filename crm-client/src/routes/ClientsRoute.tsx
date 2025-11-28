import { useState, useEffect } from "react"
import ClientsPage from "../components/ClientsPage"
import type { Client } from "../App"
import { clientsAPI } from "../api-beauty"

export default function ClientsRoute() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const data = await clientsAPI.getAll()
        setClients(data)
      } catch (err) {
        console.error("Error fetching clients:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchClients()
  }, [])

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

  return (
    <ClientsPage
      clients={clients}
      onAdd={handleAddClient}
      onUpdate={handleUpdateClient}
      onDelete={handleDeleteClient}
      isLoading={loading}
    />
  )
}
