import { http } from "./http";

export type HealthResponse = {
  status: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const res = await http.get<HealthResponse>("/health");
  return res.data;
}
