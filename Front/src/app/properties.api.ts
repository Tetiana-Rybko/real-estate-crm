import { api } from "./api";

export interface Property {
  id: number;
  title: string;
  city?: string | null;
  district?: string | null;
  address?: string | null;
  price?: number | null;
  rooms?: number | null;
  area_total?: number | null;
  floor?: number | null;
}

export interface PropertyCreate {
  title: string;
  city?: string;
  district?: string;
  address?: string;
  price?: number;
  rooms?: number;
  area_total?: number;
  floor?: number;
}

export async function getProperties(): Promise<Property[]> {
  const res = await api.get<Property[]>("/properties/my");
  return res.data;
}

export async function createProperty(payload: PropertyCreate): Promise<Property> {
  const res = await api.post<Property>("/properties", payload);
  return res.data;
}

export async function deleteProperty(id: number) {
  await api.delete(`/properties/${id}`);
}
export async function updateProperty(
  id: number,
  payload: Partial<PropertyCreate>
): Promise<Property> {
  const res = await api.put<Property>(`/properties/${id}`, payload);
  return res.data;
}