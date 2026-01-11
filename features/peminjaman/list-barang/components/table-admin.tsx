import { AdminColumns } from "../config/admin-config";
import useBarang from "../hooks/useBarang";
import { DataTable } from "@/shared/organism/data-table";

export function AdminTableListBarang() {
  const { data, loading } = useBarang();

  return (
    <DataTable
      columns={AdminColumns}
      data={data}
      loading={loading}
      emptyText="Data barang belum tersedia"
    />
  );
}
