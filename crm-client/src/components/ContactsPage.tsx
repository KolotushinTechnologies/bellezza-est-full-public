import { useState, useEffect } from "react"
import { Phone, Instagram, MapPin, Save, Loader2 } from "lucide-react"
import { getContact, updateContact, Contact } from "../api"
import { useToast } from "../../hooks/use-toast"
import ContactsSkeleton from "./ContactsSkeleton"

export default function ContactsPage() {
  const { toast } = useToast()
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    instagram: "",
    address: "",
  })

  useEffect(() => {
    loadContact()
  }, [])

  const loadContact = async () => {
    try {
      setLoading(true)
      const data = await getContact()
      if (data) {
        setContact(data)
        setFormData({
          phone: data.phone,
          instagram: data.instagram,
          address: data.address,
        })
      }
    } catch (error) {
      console.error("Error loading contact:", error)
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить контактную информацию",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      
      const updatedContact = await updateContact(formData)
      setContact(updatedContact)
      
      toast({
        title: "Контакты обновлены",
        description: "Контактная информация успешно обновлена",
        variant: "default",
      })
    } catch (error) {
      console.error("Error updating contact:", error)
      toast({
        title: "Ошибка сохранения",
        description: error instanceof Error ? error.message : "Не удалось обновить контакты",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (loading) {
    return <ContactsSkeleton />
  }

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "var(--color-text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Контактная информация
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem" }}>
          Управление контактными данными, отображаемыми на сайте
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                <Phone size={16} />
                Телефон
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (XXX) XXX-XX-XX"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "var(--color-bg-light)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-primary)",
                }}
              />
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.375rem",
                }}
              >
                Формат: +7 (XXX) XXX-XX-XX
              </p>
            </div>

            {/* Instagram */}
            <div>
              <label
                htmlFor="instagram"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                <Instagram size={16} />
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@username"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "var(--color-bg-light)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-primary)",
                }}
              />
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.375rem",
                }}
              >
                Формат: @username
              </p>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                <MapPin size={16} />
                Адрес
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="г. Находка, Приморский край"
                required
                rows={3}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "var(--color-bg-light)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-primary)",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: saving ? "#6b7280" : "#10b981",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9375rem",
                fontWeight: "600",
                cursor: saving ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!saving) {
                  e.currentTarget.style.background = "#059669"
                }
              }}
              onMouseLeave={(e) => {
                if (!saving) {
                  e.currentTarget.style.background = "#10b981"
                }
              }}
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Сохранить изменения
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Info Card */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.5rem",
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <h3
          style={{
            fontSize: "0.9375rem",
            fontWeight: "600",
            color: "var(--color-text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          ℹ️ Важная информация
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
          Изменения контактной информации автоматически отобразятся на всех страницах сайта, включая
          футер, страницу контактов и кнопки для связи.
        </p>
      </div>
    </div>
  )
}
