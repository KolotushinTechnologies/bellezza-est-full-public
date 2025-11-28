"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, X, AlertTriangle } from "lucide-react"
import type { BlogPost } from "../App"
import { uploadAPI } from "../api-beauty"
import ModalPortal from "./ModalPortal"
import RichTextEditor from "./RichTextEditor"
import { useToast } from "../../hooks/use-toast"
import BlogPostsSkeleton from "./BlogPostsSkeleton"
import ImageLoader from "./ImageLoader"

interface BlogPostsPageProps {
  posts: BlogPost[]
  onAdd: (post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdate: (id: string, post: Partial<BlogPost>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

export default function BlogPostsPage({ posts, onAdd, onUpdate, onDelete, isLoading = false }: BlogPostsPageProps) {
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({ slug: '', title: '', excerpt: '', content: '', date: '', image: '' })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingPost) {
        await onUpdate(editingPost._id, formData)
        toast({
          title: "Пост обновлен",
          description: "Изменения успешно сохранены",
          variant: "default",
        })
      } else {
        await onAdd(formData)
        toast({
          title: "Пост создан",
          description: "Новый пост успешно добавлен",
          variant: "default",
        })
      }
      setShowModal(false)
      setFormData({ slug: '', title: '', excerpt: '', content: '', date: '', image: '' })
      setEditingPost(null)
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: error instanceof Error ? error.message : 'Не удалось сохранить пост',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({ slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content, date: post.date, image: post.image })
    setShowModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (postToDelete) {
      try {
        await onDelete(postToDelete)
        toast({
          title: "Пост удален",
          description: "Пост успешно удален",
          variant: "default",
        })
        setShowDeleteConfirmation(false)
        setPostToDelete(null)
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить пост",
          variant: "destructive",
        })
      }
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setPostToDelete(null)
  }

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
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Блог</h1>
        <button
          onClick={() => {
            setEditingPost(null)
            setFormData({ slug: '', title: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0], image: '' })
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
          Добавить пост
        </button>
      </div>

      {isLoading ? (
        <BlogPostsSkeleton />
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Посты блога еще не добавлены
          </p>
          <p style={{ color: 'var(--color-text-light)' }}>
            Нажмите "Добавить пост" чтобы создать первый пост
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <ImageLoader
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                style={{ width: '280px', height: '200px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
                  {post.date}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: '1.5', flex: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleEdit(post)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--color-bg-light)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Edit2 size={16} />
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post._id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
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
                {editingPost ? 'Редактировать пост' : 'Новый пост'}
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
                Slug (URL) *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                placeholder="pro-age-philosophy"
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
                Заголовок *
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
                Краткое описание *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                rows={3}
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

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Полный текст статьи *
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Введите текст статьи..."
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Дата *
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="15 ноября 2025"
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
              Вы действительно хотите удалить этот пост? Это действие нельзя отменить.
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
