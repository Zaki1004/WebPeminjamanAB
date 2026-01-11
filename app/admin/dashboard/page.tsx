// import { BarangDipinjamCard } from "@/features/dashboard/components/cards/barang-dipinjam-card";
// import { DendaAktifCard } from "@/features/dashboard/components/cards/denda-aktif-card";
// import { PengajuanBaruCard } from "@/features/dashboard/components/cards/pengajuan-baru-card";

// const DashboardSuperAdminPage = () => {
//   return (
//     <div className="grid grid-flow-col grid-rows-3 gap-4">
//       <div className="col-span-2">
//         <DendaAktifCard data={10} />
//       </div>
//       <div className="col-span-2 row-span-2">
//         <BarangDipinjamCard data={5} />
//       </div>
//       <div className="row-span-3">
//         <PengajuanBaruCard data={3} />
//       </div>
//     </div>
//   );
// };

// export default DashboardSuperAdminPage;

"use client";

import DashboardPage from "@/features/dashboard/page";
import { AdminTableListBarang } from "@/features/peminjaman/list-barang/components/table-admin";
import { useAuthRole } from "@/lib/auth";

const AdminDashboard = () => {
  const role = useAuthRole(); // ambil dari token (misal ADMIN)

  if (role !== "admin") {
    return <div className="p-4 text-red-500">Access Denied</div>;
  }

  return (
    <div>
      <DashboardPage />
      <h1 className="text-xl font-semibold mb-4">Data Barang</h1>
      <AdminTableListBarang />
    </div>
  );
};

export default AdminDashboard;
