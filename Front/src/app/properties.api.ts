import axios from "axios";
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
  main_image?: string | null;
  images_count: number;
  images: {
  id: number;
    property_id: number;
    file_path: string;
    is_main: boolean;
    sort_order: number;
    created_at: string;
}[],
}
export interface PropertyImage {
  id: number;
  property_id: number;
  file_path: string;
  is_main: boolean;
  sort_order: number;
  created_at: string;
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
  try {
    const res = await api.get<Property[]>(`/properties/my`);
    return res.data;
  } catch (err: unknown) {
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 || err.response?.status === 403)
    ) {
      const res = await api.get<Property[]>(`/properties`);
      return res.data;
    }
    throw err;
  }
}

export async function createProperty(
  payload: PropertyCreate
): Promise<Property> {
  const res = await api.post<Property>(`/properties`, payload);
  return res.data;
}

export async function deleteProperty(id: number): Promise<void> {
  await api.delete(`/properties/${id}`);
}

export async function updateProperty(
  id: number,
  payload: Partial<PropertyCreate>
): Promise<Property> {
  const res = await api.put<Property>(`/properties/${id}`, payload);
  return res.data;
}
export async function uploadPropertyImages(
  propertyId: number,
  files: File[],
): Promise<{ uploaded: number }> {
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }

  const res = await api.post(`/properties/${propertyId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function makePropertyImageMain(
  imageId: number,
): Promise<PropertyImage> {
  const res = await api.post(`/properties/images/${imageId}/make-main`);
  return res.data;
}
export async function deletePropertyImage(imageId: number): Promise<void> {
  await api.delete(`/properties/images/${imageId}`);
}

