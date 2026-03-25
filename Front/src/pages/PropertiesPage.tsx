import { useEffect, useState } from "react";
import axios from "axios";
import {
  getProperties,
  deleteProperty,
  type Property,
} from "../app/properties.api";
import CreatePropertyForm from "./CreatePropertyForm";

const labelStyle = {
  fontSize: 12,
  color: "#A07C8D",
  marginBottom: 4,
  textTransform: "uppercase" as const,
  letterSpacing: 0.4,
};

const valueStyle = {
  color: "#2F2430",
  fontSize: 15,
};

export default function PropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Property | null>(null);

  async function load(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const data: Property[] = await getProperties();
      setItems(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Не вдалося завантажити об'єкти");
      } else {
        setError("Не вдалося завантажити об'єкти");
      }
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: number): Promise<void> {
    if (!confirm("Видалити об'єкт?")) return;

    try {
      await deleteProperty(id);
      if (editing?.id === id) {
        setEditing(null);
      }
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Не вдалося видалити об'єкт");
      } else {
        alert("Не вдалося видалити об'єкт");
      }
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              color: "#4A0F28",
            }}
          >
            Об'єкти
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#7A5A68",
              fontSize: 15,
            }}
          >
            Список об'єктів нерухомості
          </p>
        </div>

        <button
          onClick={load}
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
          Оновити
        </button>
      </div>

      <CreatePropertyForm
        onCreated={async () => {
          setEditing(null);
          await load();
        }}
        initialData={editing}
        onCancelEdit={() => setEditing(null)}
      />

      {loading && (
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#FFFFFF",
            color: "#7A5A68",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          Завантаження...
        </div>
      )}

      {error && (
        <div
          style={{
            color: "crimson",
            marginBottom: 16,
            padding: 16,
            borderRadius: 12,
            background: "#FFF5F7",
          }}
        >
          Помилка: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#FFFFFF",
            color: "#7A5A68",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          Поки що немає жодного об'єкта.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {items.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
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
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#4A0F28",
                    }}
                  >
                    {p.title}
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      color: "#A07C8D",
                    }}
                  >
                    ID: {p.id}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setEditing(p)}
                    type="button"
                    style={{
                      border: "none",
                      background: "#EEF2FF",
                      color: "#3A4ED5",
                      borderRadius: 10,
                      padding: "6px 10px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Редагувати
                  </button>

                  <button
                    onClick={() => remove(p.id)}
                    type="button"
                    style={{
                      border: "none",
                      background: "#FBECEF",
                      color: "#A53A57",
                      borderRadius: 10,
                      padding: "6px 10px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Видалити
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <div>
                  <div style={labelStyle}>Адреса</div>
                  <div style={valueStyle}>
                    {[p.city, p.district, p.address].filter(Boolean).join(", ") ||
                      "Не вказано"}
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Ціна</div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#4A0F28",
                    }}
                  >
                    {p.price ? `${p.price} €` : "Не вказано"}
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Характеристики</div>
                  <div style={valueStyle}>
                    {p.rooms ?? "—"} кімн • {p.area_total ?? "—"} м² • поверх{" "}
                    {p.floor ?? "—"}
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
