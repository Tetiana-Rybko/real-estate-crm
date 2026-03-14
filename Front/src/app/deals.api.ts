import { api } from "./api";

export type DealStatus =
  | "new"
  | "qualified"
  | "showing"
  | "negotiation"
  | "contract"
  | "won"
  | "lost"
  | "archived";

export type DealType = "sale" | "purchase" | "rent";

export interface Deal {
  id: number;
  client_id: number;
  realtor_id: number;
  title: string;
  type: DealType;
  status: DealStatus;
  budget_min?: number | null;
  budget_max?: number | null;
  note?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DealCreate {
  title: string;
  type: DealType;
  status: DealStatus;
  client_id: number;
  realtor_id: number;
  budget_min?: number;
  budget_max?: number;
  note?: string;
}

export async function getDeals(): Promise<Deal[]> {
  const res = await api.get<Deal[]>("/deals");
  return res.data;
}

export async function createDeal(payload: DealCreate): Promise<Deal> {
  const res = await api.post<Deal>("/deals", payload);
  return res.data;
}

export async function updateDeal(
  id: number,
  payload: Partial<DealCreate>
): Promise<Deal> {
  const res = await api.patch<Deal>(`/deals/${id}`, payload);
  return res.data;
}

export async function updateDealStatus(
  id: number,
  status: DealStatus
): Promise<Deal> {
  const res = await api.patch<Deal>(`/deals/${id}/status`, { status });
  return res.data;
}

export async function deleteDeal(id: number): Promise<void> {
  await api.delete(`/deals/${id}`);
}