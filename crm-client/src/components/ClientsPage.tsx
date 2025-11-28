"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, X, User } from "lucide-react"
import type { Client } from "../App"
import ModalPortal from "./ModalPortal"

interface ClientsPageProps {
  clients: Client[]
  onAdd: (client: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdate: (id: string, client: Partial<Client>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function ClientsPage({ clients, onAdd, onUpdate, onDelete }: ClientsPageProps) {
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingClient) {
        await onUpdate(editingClient._id, formData)
      } else {
        await onAdd(formData)
      }
      setShowModal(false)
      setFormData({ name: '', phone: '', email: '', notes: '' })
      setEditingClient(null)
    } catch (error) {
      alert('Ошибка при сохранении')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({ 
      name: client.name, 
      phone: client.phone, 
      email: client.email || '', 
      notes: client.notes || '' 
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Удалить клиента?')) {
      await onDelete(id)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Клиенты</h1>
        <button
          onClick={() => {
            setEditingClient(null)
            setFormData({ name: '', phone: '', email: '', notes: '' })
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
          Добавить клиента
        </button>
      </div>

      {clients.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Клиенты еще не добавлены
          </p>
          <p style={{ color: 'var(--color-text-light)' }}>
            Нажмите "Добавить клиента" чтобы создать первого клиента
          </p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-light)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Имя</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Телефон</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Заметки</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
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
                        <User size={20} color="var(--color-text-secondary)" />
                      </div>
                      <span style={{ fontWeight: '500' }}>{client.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{client.phone}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{client.email || '—'}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-secondary)', maxWidth: '200px' }}>
                    {client.notes ? (
                      <span style={{ 
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {client.notes}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleEdit(client)}
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
                        onClick={() => handleDelete(client._id)}
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
          maxWidth: '500px'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                {editingClient ? 'Редактировать клиента' : 'Новый клиент'}
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
                Имя *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Телефон *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+7 (999) 123-45-67"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Заметки
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Дополнительная информация о клиенте"
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
    </div>
  )
}
