"use client"

import { Link } from "react-router-dom"
import { Briefcase, Image, BookOpen, FileText, Users, Calendar } from "lucide-react"
import type { Service, PortfolioItem, CareArticle, BlogPost, Client, Appointment } from "../App"
import ImageLoader from "./ImageLoader"

interface DashboardHomeProps {
  services: Service[]
  portfolio: PortfolioItem[]
  careArticles: CareArticle[]
  blogPosts: BlogPost[]
  clients: Client[]
  appointments: Appointment[]
  isLoading?: boolean
}

export default function DashboardHome({ services, portfolio, careArticles, blogPosts, clients, appointments, isLoading = false }: DashboardHomeProps) {
  const stats = [
    {
      label: "Услуги",
      value: services.length,
      color: "#10b981",
      icon: Briefcase,
    },
    {
      label: "Портфолио",
      value: portfolio.length,
      color: "#3b82f6",
      icon: Image,
    },
    {
      label: "Статьи по уходу",
      value: careArticles.length,
      color: "#f59e0b",
      icon: BookOpen,
    },
    {
      label: "Посты в блоге",
      value: blogPosts.length,
      color: "#8b5cf6",
      icon: FileText,
    },
    {
      label: "Клиенты",
      value: clients.length,
      color: "#ec4899",
      icon: Users,
    },
    {
      label: "Записи",
      value: appointments.length,
      color: "#06b6d4",
      icon: Calendar,
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "var(--color-text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Дашборд
        </h1>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--color-text-secondary)",
          }}
        >
          Обзор ключевых показателей салона красоты Bellezza Estetica
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon

          return (
            <div
              key={index}
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--color-border)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-md)"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {stat.label}
                </p>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: `${stat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={24} color={stat.color} />
                </div>
              </div>

              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "var(--color-text-primary)",
                }}
              >
                {stat.value}
              </h3>
            </div>
          )
        })}
      </div>

      {isLoading ? (
        <div
          style={{
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
            marginBottom: "1.5rem"
          }}
        >
          <div
            style={{
              height: "1.5rem",
              width: "200px",
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
              borderRadius: '4px',
              marginBottom: "1.5rem",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite'
                  }}
                />
                <div style={{ padding: "1rem" }}>
                  <div
                    style={{
                      height: "1rem",
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite',
                      borderRadius: '4px',
                      width: '80%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : services.length > 0 && (
        <div
          style={{
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
            marginBottom: "1.5rem"
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "var(--color-text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Последние услуги
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {services.slice(0, 4).map((service) => (
              <Link
                key={service._id}
                to={`/services?highlight=${service._id}`}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  transition: "all 0.2s",
                  textDecoration: "none",
                  display: "block",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.15)"
                  e.currentTarget.style.borderColor = "#10b981"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.borderColor = "var(--color-border)"
                }}
              >
                <ImageLoader
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "1rem" }}>
                  <h3
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {appointments.length > 0 && (
        <div
          style={{
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "var(--color-text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Последние записи
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {appointments.slice(0, 5).map((appointment) => {
              const client = clients.find(c => c._id === appointment.client)
              const service = services.find(s => s._id === appointment.service)
              
              return (
                <Link
                  key={appointment._id}
                  to={`/appointments?highlight=${appointment._id}`}
                  style={{
                    padding: "1rem",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.15)"
                    e.currentTarget.style.borderColor = "#10b981"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.borderColor = "var(--color-border)"
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "600", marginBottom: "0.25rem", color: "var(--color-text-primary)" }}>{client?.name || 'Неизвестно'}</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                      {service?.title || 'Неизвестно'}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                      {appointment.date}
                    </p>
                    <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--color-text-primary)" }}>
                      {appointment.startTime}-{appointment.endTime}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
