import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../app/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      navigate("/clients");
    } catch {
      alert("Невірний логін або пароль");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/logo.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          right: 40,
          bottom: 20,

          width: 340,
          padding: 28,
          borderRadius: 16,
          background: "rgba(255,255,255,0.9)",

          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <h2 style={{ textAlign: "center", margin: 0 }}>
          Авторизуватися
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#4A0F28",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Увійти
        </button>
      </form>
    </div>
  );
}