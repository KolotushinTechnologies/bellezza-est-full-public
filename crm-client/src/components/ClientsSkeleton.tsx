export default function ClientsSkeleton() {
  return (
    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--color-bg-light)', borderBottom: '1px solid var(--color-border)' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Имя</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Телефон</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Заметки</th>
            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                  <div
                    style={{
                      width: '120px',
                      height: '16px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </td>
              <td style={{ padding: '1rem' }}>
                <div
                  style={{
                    width: '140px',
                    height: '16px',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite',
                    borderRadius: '4px',
                  }}
                />
              </td>
              <td style={{ padding: '1rem' }}>
                <div
                  style={{
                    width: '160px',
                    height: '16px',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite',
                    borderRadius: '4px',
                  }}
                />
              </td>
              <td style={{ padding: '1rem' }}>
                <div
                  style={{
                    width: '100px',
                    height: '16px',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite',
                    borderRadius: '4px',
                  }}
                />
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite',
                      borderRadius: 'var(--radius-md)',
                    }}
                  />
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite',
                      borderRadius: 'var(--radius-md)',
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
