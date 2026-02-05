import { Column } from "@/shared/organism/data-table";
import {
  BARANG_STATUS_CONFIG,
  ListBarangTypes,
} from "../types/list-barang-types";
import { ActionDropdown } from "@/shared/molecules/action-dropdown-menu";

export const AdminColumns = (barang: {
  openDialog: (type: "detail" | "edit" | "delete", kode: string) => void;
}): Column<ListBarangTypes>[] => [
  { key: "kode", header: "Kode" },
  { key: "nama", header: "Nama Barang" },
  { key: "merk", header: "Merk" },
  { key: "kategori", header: "Kategori" },
  { key: "harga", header: "Harga" },
  { key: "total_unit", header: "Available Unit" },
  {
    header: "Status",
    render: (row) => {
      const config = BARANG_STATUS_CONFIG[row.status];

      if (!config) {
        return (
          <span className="bg-gray-100 text-gray-600">
            {row.status ?? "Unknown"}
          </span>
        );
      }

      return <span className={config.className}>{config.label}</span>;
    },
  },
  {
    header: "Action",
    render: (row) => (
      <ActionDropdown
        row={row}
        actions={[
          {
            label: "Detail",
            onClick: () => barang.openDialog("detail", row.kode),
          },
          {
            label: "Edit",
            onClick: () => barang.openDialog("edit", row.kode),
          },
          {
            label: "Hapus",
            variant: "danger",
            onClick: () => barang.openDialog("delete", row.kode),
          },
        ]}
      />
    ),
  },
];
