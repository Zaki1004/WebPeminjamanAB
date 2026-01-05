import { LoginPayload, LoginResponse } from "../types/auth-type";

export const loginService = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  // MOCK (nanti ganti API backend)
  if (payload.nra === "NRA001") {
    return {
      accessToken: "token-superadmin",
      role: "SUPERADMIN",
    };
  }

  if (payload.nra === "NRA002") {
    return {
      accessToken: "token-admin",
      role: "ADMIN",
    };
  }

  return {
    accessToken: "token-eksternal",
    role: "EKSTERNAL",
  };
};
