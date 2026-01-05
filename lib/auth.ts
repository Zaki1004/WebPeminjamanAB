import { Role } from "@/features/login/types/auth-type";

export const saveAuth = (token: string, role: Role) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("role", role);
};

export const getRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role") as Role;
};

export const logout = () => {
  localStorage.removeItem("access_token");
localStorage.removeItem("role");
};

// ======================
// Mapping Role → Permission
// ======================
const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPERADMIN: [
    "dashboard.superadmin",
    "dashboard.admin",
    "admin.read",
    "user.read",
    "peminjaman.read",
    "peminjaman.manage",
    "inventaris.manage",
    "pengembalian.read",
    "denda.read",
  ],
  ADMIN: [
    "dashboard.admin",
    "peminjaman.manage",
    "inventaris.manage",
    "pengembalian.read",
    "denda.read",
    "user.read",
  ],
  EKSTERNAL: ["peminjaman.read", "pengembalian.read"],
};

// Ambil permission sesuai role
export const getUserPermissions = (): string[] => {
  const role = getRole();
  if (!role) return [];
  return ROLE_PERMISSIONS[role] || [];
};
