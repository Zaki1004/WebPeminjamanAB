"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginPayload {
  nra: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);

      const result = await signIn("credentials", {
        nra: payload.nra,
        password: payload.password,
        redirect: false,
      });

      if (!result || result.error) {
        throw new Error("Login gagal");
      }

      /**
       * JANGAN ambil role di sini
       * JANGAN simpan token manual
       * NextAuth yang pegang session
       */
      router.push("/dashboard"); // dashboard netral
    } catch {
      setError("NRA atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
export default useLogin;
