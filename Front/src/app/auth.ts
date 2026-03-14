type JwtPayload = {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
};

function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getUserRole(): string | null {
  const token = getToken();
  if (!token) return null;

  const payload = parseJwt(token);
  return payload?.role ?? null;
}

export function isAdmin(): boolean {
  return getUserRole() === "ADMIN";
}

export function isAgent(): boolean {
  return getUserRole() === "AGENT";
}