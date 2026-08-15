// shared/utils/jwt.util.ts
export function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '=');
    const { exp } = JSON.parse(atob(padded)) as { exp?: number };
    return exp ? Date.now() >= exp * 1000 : false;
  } catch {
    return true; // malformed token → treat as invalid
  }
}
