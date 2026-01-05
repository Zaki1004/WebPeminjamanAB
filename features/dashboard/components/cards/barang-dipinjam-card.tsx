import Card from "@/shared/organism/card";

export const BarangDipinjamCard = ({ data }: { data?: number }) => {
  return <Card title="Barang Dipinjam" value={data ?? 0} />;
};
