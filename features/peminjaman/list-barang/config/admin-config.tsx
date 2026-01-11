import { Column } from "@/shared/organism/data-table";
import { ListBarangTypes } from "../types/list-barang-types";

export const AdminColumns: Column<ListBarangTypes>[] = [
  { key: "kode", header: "Kode" },
  { key: "nama", header: "Nama Barang" },
  { key: "merk", header: "Merk" },
  { key: "kategori", header: "Kategori" },
  { key: "stok_total", header: "Stok Total" },
  { key: "stok_sisa", header: "Stok Sisa" },
  {
    header: "Status",
    render: (row: ListBarangTypes) => (
      <span
        className={row.status === "aktif" ? "text-green-600" : "text-red-600"}
      >
        {row.status}
      </span>
    ),
  },
];
