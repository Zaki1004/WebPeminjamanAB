// import { TotalAdminCard } from "@/features/dashboard/components/cards/total-admin-card";
// import { TotalBarangDipinjamCard } from "@/features/dashboard/components/cards/total-barang-dipinjam-card";
// import { TotalBarangRusakCard } from "@/features/dashboard/components/cards/total-barang-rusak-card";
// import { TotalPeminjamanCard } from "@/features/dashboard/components/cards/total-peminjaman-card";
// import { TotalPendapatanDendaCard } from "@/features/dashboard/components/cards/total-pendapatan-denda-card";
// import { TotalUserCard } from "@/features/dashboard/components/cards/total-user-card";

// const DashboardSuperAdminPage = () => {
//   return (
//     <div className="p-4 grid grid-cols-4 auto-rows-fr h-screen md:grid-cols-2 lg:grid-cols-4 gap-4">
//       <TotalPeminjamanCard data={10} />
//       <TotalBarangRusakCard data={10} />
//       <TotalUserCard data={10} />
//       <TotalAdminCard data={10} />
//       <div className="col-span-2 row-span-2">
//         <TotalBarangDipinjamCard data={10} />
//       </div>
//       <div className="col-span-2 row-span-2 ">
//         <TotalPendapatanDendaCard data={10} />
//       </div>
//     </div>
//   );
// };

// export default DashboardSuperAdminPage;

"use client";

import DashboardPage from "@/features/dashboard/page";
import { useAuthRole } from "@/lib/auth";

const SuperAdminDashboard = () => {
  const role = useAuthRole(); // ambil dari token (misal SUPERADMIN)

  if (role !== "superadmin") {
    return <div className="p-4 text-red-500">Access Denied</div>;
  }

  return <DashboardPage />;
};

export default SuperAdminDashboard;
