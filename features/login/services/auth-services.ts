// features/login/services/auth-services.ts
import Api from "@/services/api";
import { LoginPayload, LoginResponse } from "../types/auth-type";
import { AxiosError } from "axios";

export const loginService = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const res = await Api.post("/auth/login", payload);

    const json = res.data;

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return {
      accessToken: json.data.access_token,
      refreshToken: json.data.refresh_token,
      role: json.data.Role.toLowerCase(),
      mustChangePassword: json.data.must_change_password,
      mustFillEmail: json.data.must_fill_email,
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    throw new Error(
      err.response?.data?.message ?? "Login failed"
    );
  }
};
