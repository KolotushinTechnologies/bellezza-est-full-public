export default function BlogPostsSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {/* Image skeleton */}
          <div
            style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
          />
          
          <div style={{ padding: '1.5rem' }}>
            {/* Date skeleton */}
            <div
              style={{
                height: '0.875rem',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '4px',
                marginBottom: '0.75rem',
                width: '40%'
              }}
            />
            
            {/* Title skeleton */}
            <div
              style={{
                height: '1.5rem',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '4px',
                marginBottom: '0.75rem',
                width: '85%'
              }}
            />
            
            {/* Excerpt skeleton */}
            <div
              style={{
                height: '1rem',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '4px',
                marginBottom: '0.5rem',
                width: '100%'
              }}
            />
            <div
              style={{
                height: '1rem',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '4px',
                marginBottom: '0.5rem',
                width: '90%'
              }}
            />
            <div
              style={{
                height: '1rem',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '4px',
                marginBottom: '1rem',
                width: '80%'
              }}
            />
            
            {/* Buttons skeleton */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div
                style={{
                  flex: 1,
                  height: '2.5rem',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite',
                  borderRadius: 'var(--radius-md)'
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: '2.5rem',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite',
                  borderRadius: 'var(--radius-md)'
                }}
              />
            </div>
          </div>
        </div>
      ))}
      
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
