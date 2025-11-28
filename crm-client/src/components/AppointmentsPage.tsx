"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { Plus, Edit2, Trash2, X, Calendar, AlertTriangle } from "lucide-react"
import type { Appointment, Client, Service } from "../App"
import ModalPortal from "./ModalPortal"
import { useToast } from "../../hooks/use-toast"
import AppointmentsSkeleton from "./AppointmentsSkeleton"

interface AppointmentsPageProps {
  appointments: Appointment[]
  clients: Client[]
  services: Service[]
  onAdd: (appointment: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdate: (id: string, appointment: Partial<Appointment>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

export default function AppointmentsPage({ appointments, clients, services, onAdd, onUpdate, onDelete, isLoading = false }: AppointmentsPageProps) {
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const highlightId = searchParams.get('highlight')
  const highlightRef = useRef<HTMLTableRowElement>(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [formData, setFormData] = useState({ 
    client: '', 
    service: '', 
    date: '', 
    startTime: '', 
    endTime: '',
    status: 'pending' as 'pending' | 'confirmed' | 'completed' | 'cancelled',
    notes: '' 
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log('Submitting appointment data:', formData)
      if (editingAppointment) {
        await onUpdate(editingAppointment._id, formData)
        toast({
          title: "Запись обновлена",
          description: "Изменения успешно сохранены",
          variant: "default",
        })
      } else {
        await onAdd(formData)
        toast({
          title: "Запись создана",
          description: "Новая запись успешно добавлена",
          variant: "default",
        })
      }
      setShowModal(false)
      setFormData({ client: '', service: '', date: '', startTime: '', endTime: '', status: 'pending', notes: '' })
      setEditingAppointment(null)
    } catch (error) {
      console.error('Error saving appointment:', error)
      toast({
        title: "Ошибка сохранения",
        description: error instanceof Error ? error.message : 'Не удалось сохранить запись',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setFormData({ 
      client: typeof appointment.client === 'string' ? appointment.client : appointment.client._id,
      service: typeof appointment.service === 'string' ? appointment.service : appointment.service._id,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      notes: appointment.notes || ''
    })
    setShowModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setAppointmentToDelete(id)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (appointmentToDelete) {
      try {
        await onDelete(appointmentToDelete)
        toast({
          title: "Запись удалена",
          description: "Запись успешно удалена",
          variant: "default",
        })
        setShowDeleteConfirmation(false)
        setAppointmentToDelete(null)
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить запись",
          variant: "destructive",
        })
      }
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setAppointmentToDelete(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981'
      case 'completed': return '#6366f1'
      case 'cancelled': return '#ef4444'
      default: return '#f59e0b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает'
      case 'confirmed': return 'Подтверждена'
      case 'completed': return 'Завершена'
      case 'cancelled': return 'Отменена'
      default: return status
    }
  }

  const getClientName = (client: string | { _id: string; name: string; phone: string; email?: string }) => {
    if (typeof client === 'string') {
      const foundClient = clients.find(c => c._id === client)
      return foundClient?.name || 'Неизвестно'
    }
    return client.name
  }

  const getServiceName = (service: string | { _id: string; title: string; description: string }) => {
    if (typeof service === 'string') {
      const foundService = services.find(s => s._id === service)
      return foundService?.title || 'Неизвестно'
    }
    return service.title
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      
      // Убрать подсветку через 1.5 секунды
      const timer = setTimeout(() => {
        setSearchParams({}, { replace: true })
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [highlightId, appointments, setSearchParams])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Записи</h1>
        <button
          onClick={() => {
            setEditingAppointment(null)
            setFormData({ client: '', service: '', date: '', startTime: '', endTime: '', status: 'pending', notes: '' })
            setShowModal(true)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          <Plus size={20} />
          Новая запись
        </button>
      </div>

      {isLoading ? (
        <AppointmentsSkeleton />
      ) : appointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Записей пока нет
          </p>
          <p style={{ color: 'var(--color-text-light)' }}>
            Нажмите "Новая запись" чтобы создать первую запись
          </p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-light)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Клиент</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Услуга</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Дата и время</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Статус</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr 
                  key={appointment._id} 
                  ref={appointment._id === highlightId ? highlightRef : null}
                  style={{ 
                    borderBottom: '1px solid var(--color-border)',
                    background: appointment._id === highlightId ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        background: 'var(--color-bg-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Calendar size={20} color="var(--color-text-secondary)" />
                      </div>
                      <span style={{ fontWeight: '500' }}>{getClientName(appointment.client)}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{getServiceName(appointment.service)}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>
                    {formatDate(appointment.date)} {appointment.startTime}-{appointment.endTime}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      background: `${getStatusColor(appointment.status)}20`,
                      color: getStatusColor(appointment.status)
                    }}>
                      {getStatusText(appointment.status)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleEdit(appointment)}
                        style={{
                          padding: '0.5rem',
                          background: 'var(--color-bg-light)',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer'
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(appointment._id)}
                        style={{
                          padding: '0.5rem',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ModalPortal isOpen={showModal}>
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                {editingAppointment ? 'Редактировать запись' : 'Новая запись'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Клиент *
              </label>
              <select
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              >
                <option value="">Выберите клиента</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>{client.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Услуга *
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              >
                <option value="">Выберите услугу</option>
                {services.map(service => (
                  <option key={service._id} value={service._id}>{service.title}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Дата *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Начало *
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Конец *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Статус *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              >
                <option value="pending">Ожидает</option>
                <option value="confirmed">Подтверждена</option>
                <option value="completed">Завершена</option>
                <option value="cancelled">Отменена</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Заметки
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Дополнительная информация"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'var(--color-bg-light)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      </ModalPortal>

      {/* Диалог подтверждения удаления */}
      <ModalPortal isOpen={showDeleteConfirmation}>
        <div
          style={{
            background: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                background: '#fef2f2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <AlertTriangle size={28} color="#ef4444" />
            </div>
            
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem',
              }}
            >
              Подтверждение удаления
            </h3>
            
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              Вы действительно хотите удалить эту запись? Это действие нельзя отменить.
            </p>
            
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                width: '100%',
              }}
            >
              <button
                onClick={handleCancelDelete}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'var(--color-bg-light)',
                  color: 'var(--color-text-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Отмена
              </button>
              
              <button
                onClick={handleConfirmDelete}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </ModalPortal>
    </div>
  )
}
