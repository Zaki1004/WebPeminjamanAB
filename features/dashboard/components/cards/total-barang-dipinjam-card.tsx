import Card from "@/shared/organism/card";

export const TotalBarangDipinjamCard = ({ data }: { data?: number }) => {
  return <Card title="Total Barang Dipinjam" value={data ?? 0} />;
};
