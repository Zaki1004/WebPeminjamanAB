import { Role } from "@/features/login/types/auth-type";
import { useSession } from "next-auth/react";

export const useAuthRole = (): Role | null => {
  const { data } = useSession();
  return (data?.user?.role as Role) ?? null;
};

// ======================
// Mapping Role → Permission
// ======================
const ROLE_PERMISSIONS: Record<Role, string[]> = {
  superadmin: [
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
  admin: [
    "dashboard.admin",
    "peminjaman.manage",
    "inventaris.manage",
    "pengembalian.read",
    "denda.read",
    "user.read",
  ],
  external: ["peminjaman.read", "pengembalian.read"],
  // user: [],
};

// Ambil permission sesuai role
export const getUserPermissions = (): string[] => {
  const role = useAuthRole();
  if (!role) return [];
  return ROLE_PERMISSIONS[role] || [];
};

export const hasPermission = (
  permissions: string[],
  permission: string
): boolean => {
  return permissions.includes(permission);
};