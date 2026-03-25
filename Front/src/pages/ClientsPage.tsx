import { useEffect, useState } from "react";
import {
  getClients,
  deleteClient,
  updateClient,
  type Client,
} from "../app/clients.api";
import CreateClientForm from "./CreateClientForm";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFullName, setEditFullName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNote, setEditNote] = useState("");

  async function load() {
    const data = await getClients();
    setClients(data);
  }

  async function remove(id: number) {
    await deleteClient(id);
    load();
  }

  function startEdit(client: Client) {
    setEditingId(client.id);
    setEditFullName(client.full_name);
    setEditPhone(client.phone || "");
    setEditEmail(client.email || "");
    setEditNote(client.note || "");
  }

  async function saveEdit(id: number) {
    await updateClient(id, {
      full_name: editFullName,
      phone: editPhone,
      email: editEmail,
      note: editNote,
    });

    setEditingId(null);
    setEditFullName("");
    setEditPhone("");
    setEditEmail("");
    setEditNote("");
    load();
  }

  function cancelEdit() {
    setEditingId(null);
    setEditFullName("");
    setEditPhone("");
    setEditEmail("");
    setEditNote("");
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
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {clients.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#FFFFFF",
                borderRadius: 14,
                padding: 16,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
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

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => startEdit(c)}
                    type="button"
                    style={{
                      border: "none",
                      background: "#EEE7F8",
                      color: "#6B3FA0",
                      borderRadius: 10,
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Редагувати
                  </button>

                  <button
                    onClick={() => remove(c.id)}
                    type="button"
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
              </div>

              {editingId === c.id && (
                <div
                  style={{
                    display: "grid",
                    gap: 10,
                    marginTop: 4,
                    marginBottom: 4,
                    padding: 14,
                    borderRadius: 12,
                    background: "#F8F5FA",
                  }}
                >
                  <input
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    placeholder="Ім'я"
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid #DDD",
                      outline: "none",
                    }}
                  />

                  <input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="Телефон"
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid #DDD",
                      outline: "none",
                    }}
                  />

                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Email"
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid #DDD",
                      outline: "none",
                    }}
                  />

                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="Нотатка"
                    rows={3}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid #DDD",
                      resize: "vertical",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => saveEdit(c.id)}
                      type="button"
                      style={{
                        border: "none",
                        background: "#4A0F28",
                        color: "#FFFFFF",
                        borderRadius: 10,
                        padding: "10px 14px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Зберегти
                    </button>

                    <button
                      onClick={cancelEdit}
                      type="button"
                      style={{
                        border: "none",
                        background: "#ECECEC",
                        color: "#333333",
                        borderRadius: 10,
                        padding: "10px 14px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Скасувати
                    </button>
                  </div>
                </div>
              )}

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