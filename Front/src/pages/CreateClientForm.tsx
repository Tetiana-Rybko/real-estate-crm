import { useState } from "react";
import { createClient } from "../app/clients.api";

type Props = {
  onCreated: () => void;
};

export default function CreateClientForm({ onCreated }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createClient({
      full_name: fullName,
      phone,
      email,
      note,
    });

    setFullName("");
    setPhone("");
    setEmail("");
    setNote("");
    onCreated();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 16,
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#4A0F28",
        }}
      >
        Додати клієнта
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        <input
          placeholder="Ім'я клієнта"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />
      </div>

      <textarea
        placeholder="Нотатка"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        style={{
          padding: 12,
          borderRadius: 12,
          border: "1px solid #E7DCE2",
          outline: "none",
          fontSize: 14,
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />

      <div>
        <button
          type="submit"
          style={{
            border: "none",
            background: "#4A0F28",
            color: "#FFFFFF",
            borderRadius: 12,
            padding: "12px 18px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Створити клієнта
        </button>
      </div>
    </form>
  );
}