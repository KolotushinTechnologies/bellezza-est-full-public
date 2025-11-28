"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, X, AlertTriangle } from "lucide-react"
import type { CareArticle } from "../App"
import { uploadAPI } from "../api-beauty"
import ModalPortal from "./ModalPortal"
import RichTextEditor from "./RichTextEditor"
import { useToast } from "../../hooks/use-toast"
import CareArticlesSkeleton from "./CareArticlesSkeleton"
import ImageLoader from "./ImageLoader"

interface CareArticlesPageProps {
  articles: CareArticle[]
  onAdd: (article: Omit<CareArticle, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdate: (id: string, article: Partial<CareArticle>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

export default function CareArticlesPage({ articles, onAdd, onUpdate, onDelete, isLoading = false }: CareArticlesPageProps) {
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<CareArticle | null>(null)
  const [formData, setFormData] = useState({ 
    slug: '', 
    title: '', 
    excerpt: '', 
    content: '', 
    image: '',
    sidebarTips: ['Регулярность — ключ к успеху', 'Подбирайте средства по типу кожи', 'Не забывайте о защите от солнца'],
    sidebarTimeText: 'Уделяйте уходу за кожей минимум 10-15 минут утром и вечером для достижения наилучших результатов.'
  })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      let finalImageUrl = formData.image
      
      // Upload image first if a new file was selected
      if (selectedFile) {
        setUploading(true)
        try {
          console.log('Uploading image...', selectedFile.name)
          finalImageUrl = await uploadAPI.uploadImage(selectedFile)
          console.log('Image uploaded successfully:', finalImageUrl)
        } catch (error) {
          console.error('Image upload error:', error)
          toast({
            title: "Ошибка загрузки",
            description: error instanceof Error ? error.message : 'Не удалось загрузить изображение',
            variant: "destructive",
          })
          setLoading(false)
          setUploading(false)
          return
        } finally {
          setUploading(false)
        }
      }

      // Validate that we have an image URL
      if (!finalImageUrl) {
        alert('Пожалуйста, выберите изображение')
        setLoading(false)
        return
      }

      // Create article data with the image URL
      const articleData = {
        ...formData,
        image: finalImageUrl
      }

      console.log('Submitting article data:', articleData)

      if (editingArticle) {
        await onUpdate(editingArticle._id, articleData)
        toast({
          title: "Статья обновлена",
          description: "Изменения успешно сохранены",
          variant: "default",
        })
      } else {
        await onAdd(articleData)
        toast({
          title: "Статья создана",
          description: "Новая статья успешно добавлена",
          variant: "default",
        })
      }
      
      setShowModal(false)
      setFormData({ 
        slug: '', 
        title: '', 
        excerpt: '', 
        content: '', 
        image: '',
        sidebarTips: ['Регулярность — ключ к успеху', 'Подбирайте средства по типу кожи', 'Не забывайте о защите от солнца'],
        sidebarTimeText: 'Уделяйте уходу за кожей минимум 10-15 минут утром и вечером для достижения наилучших результатов.'
      })
      setImagePreview('')
      setSelectedFile(null)
      setEditingArticle(null)
    } catch (error) {
      console.error('Submit error:', error)
      toast({
        title: "Ошибка сохранения",
        description: error instanceof Error ? error.message : 'Не удалось сохранить статью',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (article: CareArticle) => {
    setEditingArticle(article)
    setFormData({ 
      slug: article.slug, 
      title: article.title, 
      excerpt: article.excerpt, 
      content: article.content, 
      image: article.image,
      sidebarTips: article.sidebarTips || ['Регулярность — ключ к успеху', 'Подбирайте средства по типу кожи', 'Не забывайте о защите от солнца'],
      sidebarTimeText: article.sidebarTimeText || 'Уделяйте уходу за кожей минимум 10-15 минут утром и вечером для достижения наилучших результатов.'
    })
    setImagePreview(article.image)
    setSelectedFile(null)
    setShowModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (articleToDelete) {
      try {
        await onDelete(articleToDelete)
        toast({
          title: "Статья удалена",
          description: "Статья успешно удалена",
          variant: "default",
        })
        setShowDeleteConfirmation(false)
        setArticleToDelete(null)
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить статью",
          variant: "destructive",
        })
      }
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setArticleToDelete(null)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB')
      return
    }

    // Store the file for later upload
    setSelectedFile(file)
    
    // Create local preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setImagePreview('')
    setFormData({ ...formData, image: '' })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Статьи по уходу</h1>
        <button
          onClick={() => {
            setEditingArticle(null)
            setFormData({ 
              slug: '', 
              title: '', 
              excerpt: '', 
              content: '', 
              image: '',
              sidebarTips: ['Регулярность — ключ к успеху', 'Подбирайте средства по типу кожи', 'Не забывайте о защите от солнца'],
              sidebarTimeText: 'Уделяйте уходу за кожей минимум 10-15 минут утром и вечером для достижения наилучших результатов.'
            })
            setImagePreview('')
            setSelectedFile(null)
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
          Добавить статью
        </button>
      </div>

      {isLoading ? (
        <CareArticlesSkeleton />
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Статьи по уходу еще не добавлены
          </p>
          <p style={{ color: 'var(--color-text-light)' }}>
            Нажмите "Добавить статью" чтобы создать первую статью
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {articles.map((article) => (
            <div
              key={article._id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <ImageLoader
                src={article.image || '/placeholder.svg'}
                alt={article.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {article.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: '1.5', fontSize: '0.9375rem' }}>
                  {article.excerpt}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(article)}
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
                    onClick={() => handleDeleteClick(article._id)}
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
                {editingArticle ? 'Редактировать статью' : 'Новая статья'}
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
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                placeholder="skin-care-routine"
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
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
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
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                placeholder="Введите рекомендации по уходу..."
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Изображение *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                disabled={uploading || loading}
                style={{ marginBottom: '0.5rem' }}
              />
              {imagePreview ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      background: 'rgba(220, 38, 38, 0.9)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </button>
                  {selectedFile ? (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>
                      ✓ Изображение выбрано (будет загружено при сохранении)
                    </p>
                  ) : formData.image ? (
                    <p style={{ fontSize: '0.875rem', color: 'green' }}>✓ Изображение загружено</p>
                  ) : null}
                </div>
              ) : (
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Изображение не выбрано</p>
              )}
            </div>

            <div style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Боковая панель</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                  Советы (3 пункта)
                </label>
                {formData.sidebarTips.map((tip, index) => (
                  <input
                    key={index}
                    type="text"
                    value={tip}
                    onChange={(e) => {
                      setFormData(prev => {
                        const newTips = [...prev.sidebarTips]
                        newTips[index] = e.target.value
                        return { ...prev, sidebarTips: newTips }
                      })
                    }}
                    placeholder={`Совет ${index + 1}`}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem'
                    }}
                  />
                ))}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                  Текст о времени ухода
                </label>
                <textarea
                  value={formData.sidebarTimeText}
                  onChange={(e) => setFormData(prev => ({ ...prev, sidebarTimeText: e.target.value }))}
                  rows={3}
                  placeholder="Уделяйте уходу за кожей..."
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    resize: 'vertical'
                  }}
                />
              </div>
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
                disabled={loading || uploading || (!imagePreview && !formData.image)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: (loading || uploading || (!imagePreview && !formData.image)) ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: (loading || uploading || (!imagePreview && !formData.image)) ? 0.5 : 1
                }}
              >
                {uploading ? 'Загрузка изображения...' : loading ? 'Сохранение...' : 'Сохранить'}
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
              Вы действительно хотите удалить эту статью? Это действие нельзя отменить.
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
