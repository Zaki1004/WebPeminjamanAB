export type Role = "SUPERADMIN" | "ADMIN" | "EKSTERNAL";

export interface LoginPayload {
  nra: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  role: Role;
}
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: Role | null;
}