import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>

      {/* ЛОГО / НАЗВАНИЕ */}
      <div style={styles.logo}>
        Bagira CRM
      </div>

      {/* МЕНЮ */}
      <nav style={styles.nav}>
        <Link to="/clients" style={styles.link}>Клієнти</Link>
        <Link to="/properties" style={styles.link}>Об'єкти</Link>
        <Link to="/deals" style={styles.link}>Угоди</Link>
      </nav>

    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#4A0F28", // темный бордовый
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  nav: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  link: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "16px",
    opacity: 0.9,
  },
};