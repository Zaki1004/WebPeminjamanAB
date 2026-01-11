import { DefaultSession } from "next-auth";
import { Role } from "@/features/login/types/auth-type";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
      accessToken: string;
      refreshToken: string;
      mustChangePassword: boolean;
      mustFillEmail: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    accessToken: string;
    refreshToken: string;
    mustChangePassword: boolean;
    mustFillEmail: boolean;
  }
}
