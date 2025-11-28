export default function PortfolioSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
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
              height: '250px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
          />
          
          <div style={{ padding: '1rem' }}>
            {/* Category badge skeleton */}
            <div
              style={{
                height: '1.5rem',
                width: '60%',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem'
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
