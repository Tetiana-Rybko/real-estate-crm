import { useState } from "react";
import { getHealth } from "../app/health";

export function HomePage() {
  const [status, setStatus] = useState<string>("неизвестно");

  const checkBackend = async () => {
    try {
      const data = await getHealth();
      setStatus(data.status);
    } catch (e) {
      console.error(e);
      setStatus("ошибка");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Багира SRM</h1>

      <button onClick={checkBackend}>
        Проверить backend
      </button>

      <p>
        Статус backend: <b>{status}</b>
      </p>
    </div>
  );
}
