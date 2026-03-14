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
      alert("Неверный логин или пароль");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Войти</button>
    </form>
  );
}