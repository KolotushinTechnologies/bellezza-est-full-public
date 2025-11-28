import { useState, useEffect } from "react"
import AppointmentsPage from "../components/AppointmentsPage"
import type { Appointment, Client, Service } from "../App"
import { appointmentsAPI, clientsAPI, servicesAPI } from "../api-beauty"

export default function AppointmentsRoute() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Appointments page needs clients and services for dropdowns
        const [appointmentsData, clientsData, servicesData] = await Promise.all([
          appointmentsAPI.getAll(),
          clientsAPI.getAll(),
          servicesAPI.getAll()
        ])
        setAppointments(appointmentsData)
        setClients(clientsData)
        setServices(servicesData)
      } catch (err) {
        console.error("Error fetching appointments data:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const handleAddAppointment = async (appointment: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Creating appointment with data:', appointment)
      const newAppointment = await appointmentsAPI.create(appointment)
      console.log('Server returned appointment:', newAppointment)
      setAppointments([newAppointment, ...appointments])
    } catch (err) {
      console.error("Error adding appointment:", err)
      throw err
    }
  }

  const handleUpdateAppointment = async (id: string, appointment: Partial<Appointment>) => {
    try {
      console.log('Updating appointment with data:', appointment)
      const updated = await appointmentsAPI.update(id, appointment)
      console.log('Server returned updated appointment:', updated)
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
    <AppointmentsPage
      appointments={appointments}
      clients={clients}
      services={services}
      onAdd={handleAddAppointment}
      onUpdate={handleUpdateAppointment}
      onDelete={handleDeleteAppointment}
      isLoading={loading}
    />
  )
}
