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
      <h1>Клиенты</h1>

      <CreateClientForm onCreated={load} />

      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            {c.full_name}

            <button onClick={() => remove(c.id)}>
              удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}