export default function ContactsSkeleton() {
  return (
    <div style={{ padding: "2rem" }}>
      {/* Header skeleton */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            height: "2.25rem",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            width: "300px",
          }}
        />
        <div
          style={{
            height: "1.25rem",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
            borderRadius: "4px",
            width: "400px",
          }}
        />
      </div>

      {/* Form skeleton */}
      <div
        style={{
          background: "var(--color-bg-card)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        }}
      >
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Phone field skeleton */}
          <div>
            <div
              style={{
                height: "1.25rem",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "4px",
                marginBottom: "0.5rem",
                width: "100px",
              }}
            />
            <div
              style={{
                height: "2.75rem",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "var(--radius-md)",
                width: "100%",
              }}
            />
          </div>

          {/* Instagram field skeleton */}
          <div>
            <div
              style={{
                height: "1.25rem",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "4px",
                marginBottom: "0.5rem",
                width: "100px",
              }}
            />
            <div
              style={{
                height: "2.75rem",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "var(--radius-md)",
                width: "100%",
              }}
            />
          </div>

          {/* Address field skeleton */}
          <div>
            <div
              style={{
                height: "1.25rem",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "4px",
                marginBottom: "0.5rem",
                width: "100px",
              }}
            />
            <div
              style={{
                height: "5rem",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "var(--radius-md)",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Submit button skeleton */}
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              height: "2.75rem",
              background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "var(--radius-md)",
              width: "200px",
            }}
          />
        </div>
      </div>

      {/* Info card skeleton */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.5rem",
          background: "rgba(59, 130, 246, 0.05)",
          border: "1px solid rgba(59, 130, 246, 0.1)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <div
          style={{
            height: "1.25rem",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            width: "200px",
          }}
        />
        <div
          style={{
            height: "1rem",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
            borderRadius: "4px",
            width: "100%",
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}
