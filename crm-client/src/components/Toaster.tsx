"use client"

import { useToast } from "../../hooks/use-toast"
import { X, CheckCircle, AlertCircle } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: "380px",
        width: "100%",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: "white",
            borderRadius: "0.75rem",
            padding: "1rem 1.25rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            border: toast.variant === "destructive" ? "1px solid #fee2e2" : "1px solid #e2e8f0",
            animation: "slideInFromRight 0.3s ease-out",
            position: "relative",
          }}
        >
          {/* Icon */}
          <div
            style={{
              flexShrink: 0,
              marginTop: "0.125rem",
            }}
          >
            {toast.variant === "destructive" ? (
              <AlertCircle size={20} color="#ef4444" />
            ) : (
              <CheckCircle size={20} color="#10b981" />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {toast.title && (
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "0.9375rem",
                  color: toast.variant === "destructive" ? "#991b1b" : "#1e293b",
                  marginBottom: toast.description ? "0.25rem" : 0,
                }}
              >
                {toast.title}
              </div>
            )}
            {toast.description && (
              <div
                style={{
                  fontSize: "0.875rem",
                  color: toast.variant === "destructive" ? "#991b1b" : "#64748b",
                  lineHeight: "1.4",
                }}
              >
                {toast.description}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => dismiss(toast.id)}
            style={{
              flexShrink: 0,
              background: "transparent",
              border: "none",
              padding: "0.25rem",
              cursor: "pointer",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.25rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9"
              e.currentTarget.style.color = "#64748b"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.color = "#94a3b8"
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
