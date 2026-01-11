import { BarangDipinjamCard } from "../components/cards/barang-dipinjam-card";
import { DendaAktifCard } from "../components/cards/denda-aktif-card";
import { PengajuanBaruCard } from "../components/cards/pengajuan-baru-card";
import { TotalAdminCard } from "../components/cards/total-admin-card";
import { TotalBarangDipinjamCard } from "../components/cards/total-barang-dipinjam-card";
import { TotalBarangRusakCard } from "../components/cards/total-barang-rusak-card";
import { TotalPeminjamanCard } from "../components/cards/total-peminjaman-card";
import { TotalPendapatanDendaCard } from "../components/cards/total-pendapatan-denda-card";
import { TotalUserCard } from "../components/cards/total-user-card";


export const DASHBOARD_CARDS = [
  {
    id: "total-peminjaman",
    component: TotalPeminjamanCard,
    permissions: ["dashboard.superadmin", "dashboard.admin"],
  },
  {
    id: "barang-rusak",
    component: TotalBarangRusakCard,
    permissions: ["dashboard.superadmin"],
  },
  {
    id: "total-user",
    component: TotalUserCard,
    permissions: ["dashboard.superadmin"],
  },
  {
    id: "total-admin",
    component: TotalAdminCard,
    permissions: ["dashboard.superadmin"],
  },
  {
    id: "barang-dipinjam",
    component: TotalBarangDipinjamCard,
    permissions: ["dashboard.admin", "dashboard.superadmin"],
  },
  {
    id: "pendapatan-denda",
    component: TotalPendapatanDendaCard,
    permissions: ["dashboard.superadmin"],
  },
  {
    id: "pengajuan-baru",
    component: PengajuanBaruCard,
    permissions: ["dashboard.superadmin"],
  },
  {
    id: "denda-aktif",
    component: DendaAktifCard,
    permissions: ["dashboard.superadmin"],
  },
];
