"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, X, AlertTriangle } from "lucide-react"
import type { PortfolioItem } from "../App"
import { uploadAPI } from "../api-beauty"
import ModalPortal from "./ModalPortal"
import { useToast } from "../../hooks/use-toast"
import PortfolioSkeleton from "./PortfolioSkeleton"
import ImageLoader from "./ImageLoader"

interface PortfolioPageProps {
  items: PortfolioItem[]
  onAdd: (item: Omit<PortfolioItem, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdate: (id: string, item: Partial<PortfolioItem>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

export default function PortfolioPage({ items, onAdd, onUpdate, onDelete, isLoading = false }: PortfolioPageProps) {
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [formData, setFormData] = useState({ type: 'image', src: '', category: '' })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingItem) {
        await onUpdate(editingItem._id, formData)
        toast({
          title: "Работа обновлена",
          description: "Изменения успешно сохранены",
          variant: "default",
        })
      } else {
        await onAdd(formData)
        toast({
          title: "Работа добавлена",
          description: "Новая работа успешно добавлена в портфолио",
          variant: "default",
        })
      }
      setShowModal(false)
      setFormData({ type: 'image', src: '', category: '' })
      setEditingItem(null)
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: error instanceof Error ? error.message : 'Не удалось сохранить работу',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData({ type: item.type, src: item.src, category: item.category })
    setShowModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await onDelete(itemToDelete)
        toast({
          title: "Работа удалена",
          description: "Работа успешно удалена из портфолио",
          variant: "default",
        })
        setShowDeleteConfirmation(false)
        setItemToDelete(null)
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить работу",
          variant: "destructive",
        })
      }
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setItemToDelete(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploading(true)
    try {
      const url = await uploadAPI.uploadImage(file)
      setFormData({ ...formData, src: url })
      toast({
        title: "Изображение загружено",
        description: "Изображение успешно загружено",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: error instanceof Error ? error.message : 'Не удалось загрузить изображение',
        variant: "destructive",
      })
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

      {isLoading ? (
        <PortfolioSkeleton />
      ) : items.length === 0 ? (
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
              <ImageLoader
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
                    onClick={() => handleDeleteClick(item._id)}
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
              Вы действительно хотите удалить эту работу из портфолио? Это действие нельзя отменить.
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
