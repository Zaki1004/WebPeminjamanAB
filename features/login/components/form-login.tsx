"use client";

import Buttons from "@/shared/atoms/buttons";
import FormField from "@/shared/molecules/form-field";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const handleLogin = () => {

  // }
  return (
    <>
      <div className="space-y-4">
        <FormField
          htmlFor="NRA"
          type="text"
          placeholder="Masukkan NRA Anda"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={() => {}}
        >
          Username
        </FormField>
        <div className="relative">
          <FormField
            htmlFor="password"
            type={showPassword ? "text" : "password"}
            placeholder="*********"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={() => {}}
          >
            Password
          </FormField>
          {/* Eye toggle */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[30px] text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Buttons
          onClick={() => {}}
          variant="default"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </Buttons>
      </div>
    </>
  );
};

export default FormLogin;
