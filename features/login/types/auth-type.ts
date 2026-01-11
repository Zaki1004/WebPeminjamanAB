export type Role = "superadmin" | "admin" | "external";

export interface LoginPayload {
  nra: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: Role;
  mustChangePassword: boolean;
  mustFillEmail: boolean;
}
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: Role | null;
}