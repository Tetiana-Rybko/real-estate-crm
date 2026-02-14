import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import {
  getClients,
  deleteClient,
  updateClient,
  type Client,
} from "../app/clients.api";
import CreateClientForm from "./CreateClientForm";

type ApiError = {
  detail?: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // состояние редактирования
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState({
    full_name: "",
    phone: "",
    email: "",
  });

  async function load(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const data = await getClients();
      setClients(data);
    } catch (e: unknown) {
      const err = e as AxiosError<ApiError>;
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Ошибка загрузки клиентов"
      );
    } finally {
      setLoading(false);
    }
  }

  function startEdit(c: Client) {
    setEditingId(c.id);
    setDraft({
      full_name: c.full_name,
      phone: c.phone,
      email: c.email,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: number) {
    try {
      await updateClient(id, {
        full_name: draft.full_name,
        phone: draft.phone,
        email: draft.email,
      });
      setEditingId(null);
      await load();
    } catch {
      alert("Не удалось сохранить изменения");
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Удалить клиента?")) return;
    try {
      await deleteClient(id);
      await load();
    } catch {
      alert("Не удалось удалить клиента");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bagira-page">
      <div className="bagira-wrap">
        <header className="bagira-header">
          <div className="bagira-title">
            <h1>Багира SRM</h1>
            <p>Клиенты • быстро, тепло, по делу</p>
          </div>

          <div className="bagira-actions">
            <button className="bagira-btn bagira-btn-ghost" onClick={load}>
              ⟳ Обновить
            </button>
          </div>
        </header>

        <div style={{ marginTop: 14 }}>
          <CreateClientForm onCreated={load} />
        </div>

        {loading && <div className="bagira-hint">Загрузка…</div>}
        {error && <div className="bagira-error">Ошибка: {error}</div>}

        {!loading && !error && (
          <div className="bagira-grid">
            {clients.map((c) => {
              const isEditing = editingId === c.id;

              return (
                <div className="bagira-card" key={c.id}>
                  <div className="bagira-card-top">
                    <div>
                      <h3 className="bagira-name">{c.full_name}</h3>

                      <div className="bagira-meta">
                        <div className="bagira-row">
                          <span className="bagira-chip">ID: {c.id}</span>
                        </div>

                        <div>
                          📞 <a href={`tel:${c.phone}`}>{c.phone}</a>
                        </div>

                        <div>
                          ✉️ <a href={`mailto:${c.email}`}>{c.email}</a>
                        </div>
                      </div>
                    </div>

                    <div className="bagira-row">
                      {isEditing ? (
                        <>
                          <button
                            className="bagira-btn bagira-btn-primary"
                            onClick={() => saveEdit(c.id)}
                            title="Сохранить"
                          >
                            💾
                          </button>
                          <button
                            className="bagira-btn bagira-btn-ghost"
                            onClick={cancelEdit}
                            title="Отмена"
                          >
                            ✖️
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bagira-btn"
                            onClick={() => startEdit(c)}
                            title="Редактировать"
                          >
                            ✏️
                          </button>
                          <button
                            className="bagira-btn bagira-btn-danger"
                            onClick={() => onDelete(c.id)}
                            title="Удалить"
                          >
                            🗑
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="bagira-form">
                      <input
                        className="bagira-input"
                        placeholder="Имя"
                        value={draft.full_name}
                        onChange={(e) =>
                          setDraft((p) => ({ ...p, full_name: e.target.value }))
                        }
                      />
                      <input
                        className="bagira-input"
                        placeholder="Телефон"
                        value={draft.phone}
                        onChange={(e) =>
                          setDraft((p) => ({ ...p, phone: e.target.value }))
                        }
                      />
                      <input
                        className="bagira-input"
                        placeholder="Email"
                        value={draft.email}
                        onChange={(e) =>
                          setDraft((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}