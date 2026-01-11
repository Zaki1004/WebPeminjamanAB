"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Buttons from "../atoms/buttons";
import Inputs from "../atoms/inputs";

const disabledNavbar = "/";

const NavigationBar = () => {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const { data: session, status } = useSession();

  if (disabledNavbar.includes(pathname)) {
    return null;
  }

  // ⏳ Loading → jangan render apa pun
  if (status === "loading") return null;

  // 🔐 Belum login → sidebar tidak ada
  if (!session) return null;

  const role = session.user.role;

  // 🔒 Filter berdasarkan role & path (SAMA PERSIS DENGAN SIDEBAR)
  if (pathname.startsWith("/admin") && role !== "admin") return null;
  if (pathname.startsWith("/super-admin") && role !== "superadmin") return null;
  if (pathname.startsWith("/external") && role !== "external") return null;

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/", // ⬅️ redirect setelah logout
    });
  };
  return (
    <>
      <div className="border-2 border-black flex gap-4 h-20 overflow-hidden ml-4 justify-between flex-row items-center">
        <Inputs
          placeholder="Search..."
          className="w-100 h-10 mt-5 ml-4 border-2 border-black"
          type="search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Buttons
          onClick={handleLogout}
          variant="default"
          className="bg-blue-500 text-white p-2 rounded"
        >
          LogOut
        </Buttons>
      </div>
    </>
  );
};

export default NavigationBar;

//  const meta = pageMetadata[pathname] ?? {
//     title: "Dashboard",
//     breadcrumb: "Menu / Dashboard",
//   };

// <h1 className="text-white text-4xl items-center ml-4">
//             {meta.title}
//           </h1>
//           <h2 className="text-white text-md ml-11">{meta.breadcrumb}</h2>
