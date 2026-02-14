import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  display: "block",
  padding: "10px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: "black",
  background: isActive ? "#eaeaea" : "transparent",
});

export function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          padding: 16,
          borderRight: "1px solid #eee",
          background: "#fafafa",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>
          Багира SRM
        </div>

        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink to="/" style={linkStyle} end>
            Главная
          </NavLink>
          <NavLink to="/clients" style={linkStyle}>
            Клиенты
          </NavLink>
          <NavLink to="/objects" style={linkStyle}>
            Объекты
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
