"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="bg-red-800 flex gap-4 w-full h-20 overflow-hidden">
        <div
          className={`w-auto text-white p-2 mx-8 my-4 rounded-lg ${
            pathname === "/" ? "bg-yellow-700" : ""
          } cursor-pointer text-wrap`}
        >
          <Link href="/">
            <p className="inline-block align-middle">Home Edition</p>
          </Link>
        </div>
        <div className="w-auto text-white p-2 mx-8 my-4 rounded-lg">
          Home Edition 2
        </div>
        <div className="w-auto text-white p-2 mx-8 my-4 rounded-lg">
          Home Edition 3
        </div>
        <div className="w-auto text-white p-2 mx-8 my-4 rounded-lg">
          Home Edition 4
        </div>
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
