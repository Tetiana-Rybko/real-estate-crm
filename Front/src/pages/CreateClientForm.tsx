import { useState, type FormEvent } from "react";
import type { AxiosError } from "axios";
import { createClient, type ClientCreate } from "../app/clients.api";

type Props = {
  onCreated?: () => void;
};

type ApiError = {
  detail?: string;
};

export default function CreateClientForm({ onCreated }: Props) {
  const [form, setForm] = useState<ClientCreate>({
    full_name: "",
    phone: "",
    email: "",
    note: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof ClientCreate>(key: K, value: ClientCreate[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const noteTrim = (form.note ?? "").trim();

      const payload: ClientCreate = {
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        note: noteTrim ? noteTrim : undefined,
      };

      await createClient(payload);

      setForm({ full_name: "", phone: "", email: "", note: "" });
      onCreated?.();
    } catch (e: unknown) {
      const err = e as AxiosError<ApiError>;
      setError(err.response?.data?.detail || err.message ||  "Ошибка при создании клиента");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <h3>Добавить клиента</h3>

      <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input
          placeholder="Имя"
          value={form.full_name}
          onChange={(e) => setField("full_name", e.target.value)}
          required
        />
        <input
          placeholder="Телефон"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          required
        />
        <input
          placeholder="Заметка (необязательно)"
          value={form.note ?? ""}
          onChange={(e) => setField("note", e.target.value)}
        />

        <button type="submit" disabled={saving}>
          {saving ? "Сохраняю..." : "Создать"}
        </button>

        {error && <div style={{ color: "crimson" }}>Ошибка: {error}</div>}
      </div>
    </form>
  );
}