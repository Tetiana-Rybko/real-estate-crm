import { useState } from "react";
import { createClient } from "../app/clients.api";

type Props = {
  onCreated: () => void;
};

export default function CreateClientForm({ onCreated }: Props) {
  const [fullName, setFullName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createClient({
      full_name: fullName,
    });

    setFullName("");
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Имя клиента"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <button type="submit">Создать</button>
    </form>
  );
}