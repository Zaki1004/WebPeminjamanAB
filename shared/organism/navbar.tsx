"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Inputs from "../atoms/inputs";

const disabledNavbar = "/";

const NavigationBar = () => {
  const pathname = usePathname();
  const [seacrh, setSearch] = useState("");

  if (disabledNavbar.includes(pathname)) {
    return null;
  }
  return (
    <>
      <div className="border-2 border-black flex gap-4 h-20 overflow-hidden ml-4">
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
