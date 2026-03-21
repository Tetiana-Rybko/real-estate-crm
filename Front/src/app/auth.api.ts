import { api } from "./api";

type LoginResponse = {
  access_token: string;
  token_type: string;
};

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const res = await api.post<LoginResponse>("/auth/token", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
}
