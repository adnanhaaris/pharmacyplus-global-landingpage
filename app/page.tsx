import Navbar from '@/components/layout/Navbar'
export default function Home() {
  return (
    <main
  style={{
    background: '#FFFFF0',
    minHeight: '100vh',
    paddingTop: '64px',
  }}
>
      <Navbar />
      <div className="flex items-center justify-center" style={{ height: '100vh' }}>
        <p style={{ color: '#d1d5db', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
          Hover the navbar items to preview mega menus
        </p>
      </div>
    </main>
  )
}
