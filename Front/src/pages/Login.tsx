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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Фон с логотипом */}
      <img
        src="/logo.png"
        alt="logo"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: 0.35,
          zIndex: 0 ,
        }}
      />

      {/* Затемнение */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20, 8, 14, 0.75)",
        }}
      />

      {/* Форма */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 1,
          width: 360,
          padding: 32,
          borderRadius: 18,
          background: "rgba(74, 15, 40, 0.9)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          color: "#fff",
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
            border: "none",
            outline: "none",
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
            border: "none",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#FFFFFF",
            color: "#4A0F28",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Увійти
        </button>
      </form>
    </div>
  );
}