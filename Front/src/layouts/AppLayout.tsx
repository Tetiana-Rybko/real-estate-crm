import { NavLink, Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 240,
          padding: 16,
          borderRight: "1px solid #eee",
        }}
      >
        <h2>Bagira CRM</h2>

        <nav style={{ display: "grid", gap: 10 }}>
          <NavLink to="/clients">Клієнти</NavLink>
          <NavLink to="/properties">Об'єкти</NavLink>
          <NavLink to="/deals">Угоди</NavLink>
        </nav>

        <button onClick={logout} style={{ marginTop: 20 }}>
          Вийти
        </button>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}