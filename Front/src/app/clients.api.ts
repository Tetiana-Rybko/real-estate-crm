import axios from "axios";
import { api } from "./api";

export interface Client {
  id: number;
  full_name: string;
  phone?: string | null;
  email?: string | null;
  note?: string | null;
}

export interface ClientCreate {
  full_name: string;
  phone?: string;
  email?: string;
  note?: string;
}

export async function getClients(): Promise<Client[]> {
  try {
    const res = await api.get<Client[]>("/clients/my");
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 403) {
      const res = await api.get<Client[]>("/clients");
      return res.data;
    }
    throw err;
  }
}

export async function createClient(payload: ClientCreate): Promise<Client> {
  const res = await api.post<Client>("/clients", payload);
  return res.data;
}

export async function deleteClient(id: number) {
  await api.delete(`/clients/${id}`);
}

export async function updateClient(id: number, payload: Partial<ClientCreate>) {
  const res = await api.put<Client>(`/clients/${id}`, payload);
  return res.data;
}

