import { api } from "./api";

export interface Client {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  note?: string | null;
}

export interface ClientCreate {
  full_name: string;
  phone: string;
  email: string;
  note?: string;
}

export async function getClients(): Promise<Client[]> {
  const res = await api.get<Client[]>("/clients");
  return res.data;
}
export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/clients/${id}`);
}
export async function createClient(payload: ClientCreate): Promise<Client> {
  const res = await api.post<Client>("/clients", payload);
  return res.data;
}
export type ClientUpdate = Partial<ClientCreate>;

export async function updateClient(id: number, payload: ClientUpdate): Promise<void> {
  await api.put(`/clients/${id}`, payload);
}