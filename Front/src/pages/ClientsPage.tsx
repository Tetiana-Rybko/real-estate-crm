import { useEffect, useState } from "react";
import {
  getClients,
  deleteClient,
  type Client,
} from "../app/clients.api";
import CreateClientForm from "./CreateClientForm";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  async function load() {
    const data = await getClients();
    setClients(data);
  }

  async function remove(id: number) {
    await deleteClient(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            color: "#4A0F28",
          }}
        >
          Клієнти
        </h1>

        <div
          style={{
            marginTop: 8,
            color: "#7A5A68",
            fontSize: 15,
          }}
        >
          База клієнтів агентства «Багіра»
        </div>
      </div>

      <div
        style={{
          marginBottom: 28,
          padding: 20,
          borderRadius: 16,
          background: "#FFFFFF",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <CreateClientForm onCreated={load} />
      </div>

      {clients.length === 0 ? (
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#FFFFFF",
            color: "#7A5A68",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          Поки що немає жодного клієнта
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {clients.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#FFFFFF",
                borderRadius: 18,
                padding: 20,
                boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                border: "1px solid #F0E7EC",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#4A0F28",
                      lineHeight: 1.2,
                    }}
                  >
                    {c.full_name}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: "#A07C8D",
                    }}
                  >
                    ID: {c.id}
                  </div>
                </div>

                <button
                  onClick={() => remove(c.id)}
                  style={{
                    border: "none",
                    background: "#FBECEF",
                    color: "#A53A57",
                    borderRadius: 10,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Видалити
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#A07C8D",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    Телефон
                  </div>
                  <div style={{ color: "#2F2430", fontSize: 15 }}>
                    {c.phone || "Не вказано"}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#A07C8D",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    Email
                  </div>
                  <div style={{ color: "#2F2430", fontSize: 15 }}>
                    {c.email || "Не вказано"}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#A07C8D",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    Нотатка
                  </div>
                  <div
                    style={{
                      color: "#2F2430",
                      fontSize: 15,
                      lineHeight: 1.5,
                      minHeight: 48,
                    }}
                  >
                    {c.note || "Немає нотатки"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}