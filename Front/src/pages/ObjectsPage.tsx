import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import {
  createObject,
  deleteObject,
  getObjects,
  uploadObjectPhoto,
  deleteObjectPhoto,
  type ObjectItem,
  type ObjectKind,
  type ObjectStatus,

} from "../app/objects.api";

type ApiError = { detail?: string };

const KIND_LABEL: Record<ObjectKind, string> = {
  apartment: "Квартира",
  house: "Дом",
  commercial: "Коммерция",
  land: "Земля",
  other: "Другое",
};

const STATUS_LABEL: Record<ObjectStatus, string> = {
  new: "Новый",
  active: "Активный",
  archived: "Архив",
};

export default function ObjectsPage() {
  const [items, setItems] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    kind: "apartment" as ObjectKind,
    name: "",
    address: "",
    city: "",
    status: "new" as ObjectStatus,
    price: "" as string,
    currency: "UAH",
  });

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getObjects();
      setItems(data);
    } catch (e) {
      const err = e as AxiosError<ApiError>;
      setError(err.response?.data?.detail || err.message || "Ошибка загрузки объектов");
    } finally {
      setLoading(false);
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const price = form.price.trim() === "" ? null : Number(form.price);
    await createObject({
      kind: form.kind,
      name: form.name,
      address: form.address,
      city: form.city,
      status: form.status,
      price: Number.isFinite(price as number) ? price : null,
      currency: form.currency,
      details: {},
      photos: [],
    });
    setForm((p) => ({ ...p, name: "", address: "", city: "", price: "" }));
    await load();
  }

  async function onDelete(id: number) {
    if (!confirm("Удалить объект?")) return;
    await deleteObject(id);
    await load();
  }

  async function onUpload(id: number, file: File) {
    await uploadObjectPhoto(id, file);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Объекты</h1>

      {/* Форма добавления */}
      <form onSubmit={onCreate} className="bagira-form">
        <select value={form.kind} onChange={(e) => setForm((p) => ({ ...p, kind: e.target.value as ObjectKind }))}>
          {Object.keys(KIND_LABEL).map((k) => (
            <option key={k} value={k}>
              {KIND_LABEL[k as ObjectKind]}
            </option>
          ))}
        </select>

        <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as ObjectStatus }))}>
          {Object.keys(STATUS_LABEL).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s as ObjectStatus]}
            </option>
          ))}
        </select>

        <input placeholder="Название" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        <input placeholder="Адрес" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
        <input placeholder="Город" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
        <input placeholder="Цена" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} />
        <input placeholder="Валюта" value={form.currency} onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value }))} />

        <button type="submit">➕ Добавить</button>
      </form>

      {loading && <div>Загрузка…</div>}
      {error && <div style={{ color: "crimson" }}>Ошибка: {error}</div>}

      {/* Карточки */}
      {!loading && !error && (
        <div className="bagira-grid">
          {items.map((o) => (
            <div key={o.id} className={`bagira-card status-${o.status}`}>
              <div className="bagira-card__top">
                <div className="bagira-badge">{KIND_LABEL[o.kind]}</div>
                <div className="bagira-badge ghost">{STATUS_LABEL[o.status]}</div>
              </div>

              <div className="bagira-title">{o.name || "Без названия"}</div>
              <div className="bagira-sub">
                {o.city} · {o.address}
              </div>

              <div className="bagira-price">
                {o.price ?? "—"} {o.currency}
              </div>

              <div className="bagira-photos">
  {(o.photos || []).slice(0, 4).map((p) => (
    <div key={p} className="bagira-photo">
      <img src={p} alt="" />
      <button
        className="bagira-photo__del"
        onClick={() => {
          if (!confirm("Удалить фото?")) return;
          void (async () => {
            await deleteObjectPhoto(o.id, p);
            await load();
          })();
        }}
      >
        ✖️
      </button>
    </div>
  ))}

  {(o.photos || []).length > 4 && (
    <div className="bagira-more">+{(o.photos || []).length - 4}</div>
  )}
</div>

              <div className="bagira-actions">
                <label className="bagira-upload">
                  📷 Фото
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void onUpload(o.id, f);
                    }}
                  />
                </label>

                <button onClick={() => void onDelete(o.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}