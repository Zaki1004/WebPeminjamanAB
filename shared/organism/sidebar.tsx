"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const disabledSidebar = "/";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (disabledSidebar.includes(pathname)) {
    return null;
  }

  // ⏳ Loading → jangan render apa pun
  if (status === "loading") return null;

  // 🔐 Belum login → sidebar tidak ada
  if (!session) return null;

  const role = session.user.role;

  // 🔒 Filter menu berdasarkan role
  if (pathname.startsWith("/admin") && role !== "admin") return null;
  if (pathname.startsWith("/super-admin") && role !== "superadmin") return null;

  return (
    <>
      <aside
        className={`flex-shrink-0 h-full text-xs text-white border-2 border-black ${
          collapsed ? "w-[103px]" : "w-[203px]"
        }`}
      >
        <div className="border-b-2 border-black w-full h-20 flex items-center justify-center gap-4">
          {!collapsed && (
            <>
              <Image
                src="/logo/AB With BG 1.svg"
                alt="Logo Arshaka Bimantara Sidebar"
                width={32}
                height={32}
              />
              <div className="flex flex-col text-black text-md font-medium">
                <h1>Arshaka</h1>
                <h2>Bimantara</h2>
              </div>
            </>
          )}
          {collapsed && (
            <div>
              <Image
                src="/logo/AB With BG 1.svg"
                alt="Logo Arshaka Bimantara Sidebar"
                width={32}
                height={32}
              />
            </div>
          )}
          {!collapsed && (
            <div className="p-1 border-2 border-gray-400 rounded-sm cursor-pointer">
              <Image
                src="/icon/ChevronLeft.svg"
                alt="Icon Expand Collapse Sidebar"
                width={6}
                height={10}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
          )}
          {collapsed && (
            <div className="p-1 border-2 border-gray-400 rounded-sm cursor-pointer">
              <Image
                src="/icon/ChevronLeft.svg"
                alt="Icon Expand Collapse Sidebar"
                width={6}
                height={10}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
          )}
        </div>
        <div className="m-4 space-y-4">
          <div className="border-2 border-black text-black p-2 rounded-md font-medium hover:bg-gray-300 cursor-pointer hover:border-gray-300">
            Dashboard
          </div>
          <div className="border-2 border-black text-black p-2 rounded-md font-medium hover:bg-gray-300 cursor-pointer hover:border-gray-300">
            Admin List
          </div>
          <div className="border-2 border-black text-black p-2 rounded-md font-medium hover:bg-gray-300 cursor-pointer hover:border-gray-300">
            User List
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
