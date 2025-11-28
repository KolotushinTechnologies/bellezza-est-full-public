"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { Plus, Edit2, Trash2, X, AlertTriangle } from "lucide-react"
import type { Service } from "../App"
import { uploadAPI } from "../api-beauty"
import ModalPortal from "./ModalPortal"
import { useToast } from "../../hooks/use-toast"
import ServicesSkeleton from "./ServicesSkeleton"
import ImageLoader from "./ImageLoader"

interface ServicesPageProps {
  services: Service[]
  onAdd: (service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdate: (id: string, service: Partial<Service>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

export default function ServicesPage({ services, onAdd, onUpdate, onDelete, isLoading = false }: ServicesPageProps) {
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const highlightId = searchParams.get('highlight')
  const highlightRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', image: '' })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingService) {
        await onUpdate(editingService._id, formData)
        toast({
          title: "Услуга обновлена",
          description: "Изменения успешно сохранены",
          variant: "default",
        })
      } else {
        await onAdd(formData)
        toast({
          title: "Услуга добавлена",
          description: "Новая услуга успешно добавлена",
          variant: "default",
        })
      }
      setShowModal(false)
      setFormData({ title: '', description: '', image: '' })
      setEditingService(null)
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: error instanceof Error ? error.message : 'Не удалось сохранить услугу',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({ title: service.title, description: service.description, image: service.image })
    setShowModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (serviceToDelete) {
      try {
        await onDelete(serviceToDelete)
        toast({
          title: "Услуга удалена",
          description: "Услуга успешно удалена",
          variant: "default",
        })
        setShowDeleteConfirmation(false)
        setServiceToDelete(null)
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить услугу",
          variant: "destructive",
        })
      }
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setServiceToDelete(null)
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
  }, [highlightId, services, setSearchParams])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploading(true)
    try {
      const url = await uploadAPI.uploadImage(file)
      setFormData({ ...formData, image: url })
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
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Услуги</h1>
        <button
          onClick={() => {
            setEditingService(null)
            setFormData({ title: '', description: '', image: '' })
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
          Добавить услугу
        </button>
      </div>

      {isLoading ? (
        <ServicesSkeleton />
      ) : services.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Услуги еще не добавлены
          </p>
          <p style={{ color: 'var(--color-text-light)' }}>
            Нажмите "Добавить услугу" чтобы создать первую услугу
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {services.map((service) => (
            <div
              key={service._id}
              ref={service._id === highlightId ? highlightRef : null}
              style={{
                background: service._id === highlightId ? 'rgba(16, 185, 129, 0.15)' : 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: service._id === highlightId ? '0 0 0 2px #10b981' : '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <ImageLoader
                src={service.image || '/placeholder.svg'}
                alt={service.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {service.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(service)}
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
                    onClick={() => handleDeleteClick(service._id)}
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
                {editingService ? 'Редактировать услугу' : 'Новая услуга'}
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
                Название *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                Описание *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
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
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
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
              Вы действительно хотите удалить эту услугу? Это действие нельзя отменить.
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
