import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useAuth } from "../context/AuthContext"

export default function DashboardLayout() {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar onLogout={handleLogout} />
      <main
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "2rem",
          background: "var(--color-bg-light)",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
