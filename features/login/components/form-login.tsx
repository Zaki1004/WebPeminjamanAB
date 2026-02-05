"use client";

import Buttons from "@/shared/atoms/buttons";
import FormField from "@/shared/molecules/form-field";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [nra, setNra] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      nra,
      password,
      redirect: false, // WAJIB false supaya kita kontrol redirect
      callbackUrl: "/", // redirect setelah login sukses
    });

    setLoading(false);

    if (!result || result.error) {
      setError("NRA atau password salah");
      return;
    }

    /**
     * Setelah login sukses,
     * middleware + session akan aktif.
     * Redirect ke halaman penentu (server / client bebas)
     */
    router.push("/login");
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <FormField
        htmlFor="nra"
        type="text"
        placeholder="Masukkan NRA Anda"
        value={nra}
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => setNra(e.target.value)}
      >
        NRA
      </FormField>

      <div className="relative">
        <FormField
          htmlFor="password"
          type={showPassword ? "text" : "password"}
          placeholder="*********"
          value={password}
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        >
          Password
        </FormField>

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[30px] text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Buttons
        onClick={handleLogin}
        disabled={loading}
        variant="default"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Loading..." : "Login"}
      </Buttons>
    </form>
  );
};

export default FormLogin;
