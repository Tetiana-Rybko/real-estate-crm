import type { AxiosResponse } from "axios";
import { api } from "./api";


export type ObjectKind = "apartment" | "house" | "commercial" | "land" | "other";
export type ObjectStatus = "new" | "active" | "archived";

export type ObjectDetails = Record<string, unknown>;

export interface ObjectItem {
  id: number;
  kind: ObjectKind;
  name: string;
  address: string;
  city: string;
  status: ObjectStatus;
  price: number | null;
  currency: string;
  details: ObjectDetails;
  photos?: string[]; // добавим под фото (быстро)
}

export type ObjectCreate = Omit<ObjectItem, "id">;
export type ObjectUpdate = Partial<Omit<ObjectItem, "id">>;

export async function getObjects(): Promise<ObjectItem[]> {
  const res: AxiosResponse<ObjectItem[]> = await api.get("/objects");
  return res.data;
}

export async function createObject(payload: ObjectCreate): Promise<ObjectItem> {
  const res: AxiosResponse<ObjectItem> = await api.post("/objects", payload);
  return res.data;
}

export async function updateObject(id: number, payload: ObjectUpdate): Promise<ObjectItem> {
  const res: AxiosResponse<ObjectItem> = await api.put(`/objects/${id}`, payload);
  return res.data;
}

export async function deleteObject(id: number): Promise<void> {
  await api.delete(`/objects/${id}`);
}
export async function deleteObjectPhoto(id: number, url: string): Promise<void> {
  await api.delete(`/objects/${id}/photos`, { params: { url } });
}

// фото (будет работать после шага с backend)
export async function uploadObjectPhoto(id: number, file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append("file", file);
  const res: AxiosResponse<{ url: string }> = await api.post(`/objects/${id}/photos`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}