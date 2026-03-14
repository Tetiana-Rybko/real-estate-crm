import { useEffect, useState } from "react";
import axios from "axios";
import {
  getProperties,
  deleteProperty,
  updateProperty,
  type Property,
} from "../app/properties.api";
import CreatePropertyForm from "./CreatePropertyForm";

export default function PropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const data = await getProperties();
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

  async function edit(p: Property) {
    const title = prompt("Назва об'єкта", p.title);
    if (!title) return;

    const price = prompt("Ціна", String(p.price ?? ""));
    if (price === null) return;

    try {
      await updateProperty(p.id, {
        title,
        price: price ? Number(price) : undefined,
      });

      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Не вдалося оновити об'єкт");
      } else {
        alert("Не вдалося оновити об'єкт");
      }
    }
  }

  async function remove(id: number) {
    if (!confirm("Видалити об'єкт?")) return;

    try {
      await deleteProperty(id);
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
          <h1 style={{ margin: 0 }}>Об'єкти</h1>
          <p style={{ margin: "8px 0 0", color: "#666" }}>
            Список об'єктів нерухомості
          </p>
        </div>

        <button onClick={load}>Оновити</button>
      </div>

      <CreatePropertyForm onCreated={load} />

      {loading && <div>Завантаження...</div>}

      {error && (
        <div style={{ color: "crimson", marginBottom: 16 }}>
          Помилка: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div>Поки що немає жодного об'єкта.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                padding: 14,
                borderRadius: 10,
                background: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{p.title}</div>

                  <div style={{ color: "#666", marginTop: 6 }}>
                    {[p.city, p.district, p.address]
                      .filter(Boolean)
                      .join(", ") || "Адресу не вказано"}
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <b>Ціна:</b> {p.price ?? "—"} €
                  </div>

                  <div style={{ marginTop: 4 }}>
                    <b>Кімнат:</b> {p.rooms ?? "—"} | <b>Площа:</b>{" "}
                    {p.area_total ?? "—"} м² | <b>Поверх:</b> {p.floor ?? "—"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => edit(p)}>Редагувати</button>
                  <button onClick={() => remove(p.id)}>Видалити</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}