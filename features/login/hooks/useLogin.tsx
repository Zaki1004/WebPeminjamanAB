"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useLoadingStore from "@/store/useLoadingStore";

interface LoginPayload {
  nra: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { start, stop } = useLoadingStore();
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    start();
    setError(null);
    try {
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
      stop();
    }
  };

  return { login, error };
};
export default useLogin;
