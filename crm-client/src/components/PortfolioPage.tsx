"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, X } from "lucide-react"
import type { PortfolioItem } from "../App"
import { uploadAPI } from "../api-beauty"
import ModalPortal from "./ModalPortal"

interface PortfolioPageProps {
  items: PortfolioItem[]
  onAdd: (item: Omit<PortfolioItem, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdate: (id: string, item: Partial<PortfolioItem>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function PortfolioPage({ items, onAdd, onUpdate, onDelete }: PortfolioPageProps) {
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [formData, setFormData] = useState({ type: 'image', src: '', category: '' })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingItem) {
        await onUpdate(editingItem._id, formData)
      } else {
        await onAdd(formData)
      }
      setShowModal(false)
      setFormData({ type: 'image', src: '', category: '' })
      setEditingItem(null)
    } catch (error) {
      alert('Ошибка при сохранении')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData({ type: item.type, src: item.src, category: item.category })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Удалить работу из портфолио?')) {
      await onDelete(id)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploading(true)
    try {
      const url = await uploadAPI.uploadImage(file)
      setFormData({ ...formData, src: url })
    } catch (error) {
      alert('Ошибка загрузки изображения')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Портфолио</h1>
        <button
          onClick={() => {
            setEditingItem(null)
            setFormData({ type: 'image', src: '', category: '' })
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
          Добавить работу
        </button>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Портфолио пусто
          </p>
          <p style={{ color: 'var(--color-text-light)' }}>
            Нажмите "Добавить работу" чтобы добавить первую работу в портфолио
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={item.src || '/placeholder.svg'}
                alt={item.category}
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem' }}>
                <span style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  background: 'var(--color-bg-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  marginBottom: '1rem'
                }}>
                  {item.category}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'var(--color-bg-light)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Edit2 size={16} />
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Trash2 size={16} />
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
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
                {editingItem ? 'Редактировать работу' : 'Новая работа'}
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
                Категория *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Например: Контурная пластика"
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Изображение *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                style={{ marginBottom: '0.5rem' }}
              />
              {formData.src && (
                <img
                  src={formData.src}
                  alt="Preview"
                  style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                />
              )}
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
                disabled={loading || uploading}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: loading || uploading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: loading || uploading ? 0.5 : 1
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
