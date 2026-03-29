import { NavLink, Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const linkBase: React.CSSProperties = {
    color: "#F8EAF0",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: 10,
    display: "block",
    fontWeight: 500,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F6F3F5" }}>
      <aside
        style={{
          width: 260,
          padding: 20,
          background: "#4A0F28",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          boxShadow: "2px 0 12px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <img
            src="/logo.png"
            alt="Багіра"
            style={{
              width: 88,
              height: 88,
              objectFit: "contain",
              marginBottom: 12,
            }}
          />

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: 0.3,
            }}
          >
            Багіра
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              color: "#D8B8C5",
            }}
          >
            Агентство нерухомості
          </div>
        </div>

        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink
            to="/clients"
            style={({ isActive }) => ({
              ...linkBase,
              background: isActive ? "#6B1D3B" : "transparent",
            })}
          >
            Клієнти
          </NavLink>

          <NavLink
            to="/properties"
            style={({ isActive }) => ({
              ...linkBase,
              background: isActive ? "#6B1D3B" : "transparent",
            })}
          >
            Об'єкти
          </NavLink>

          <NavLink
            to="/deals"
            style={({ isActive }) => ({
              ...linkBase,
              background: isActive ? "#6B1D3B" : "transparent",
            })}
          >
            Угоди
          </NavLink>
          {/* 👉 ВОТ ЭТО НОВОЕ */}
          <NavLink
            to="/property-intakes"
            style={({ isActive }) => ({
              ...linkBase,
              background: isActive ? "#6B1D3B" : "transparent",
            })}
          >
            Акти прийому
          </NavLink>
        </nav>

        <button
          onClick={logout}
          style={{
            marginTop: "auto",
            background: "#FFFFFF",
            color: "#4A0F28",
            border: "none",
            borderRadius: 10,
            padding: "12px 14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Вийти
        </button>
      </aside>

      <main
        style={{
          flex: 1,
          padding: 28,
          background: "#F6F3F5",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}