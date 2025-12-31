"use client";

import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div className="text-white rounded-lg bg-black w-auto h-10 p-4 flex items-center justify-center">
          <Link href="/super-admin">Super Admin</Link>
        </div>
        <div className="text-white rounded-lg bg-black w-auto h-10 p-4 flex items-center justify-center">
          <Link href="/admin/buat-akun-user">Admin</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
