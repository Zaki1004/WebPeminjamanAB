import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/auth-services";
import { LoginPayload } from "../types/auth-type";
import { saveAuth } from "@/lib/auth";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginService(payload);
      saveAuth(res.accessToken, res.role);

      // Redirect multi-role
      switch (res.role) {
        case "SUPERADMIN":
          router.push("/superadmin/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        default:
          router.push("/dashboard");
      }
    } catch {
      setError("NRA atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
