import Card from "@/shared/organism/card";

export const TotalBarangRusakCard = ({ data }: { data?: number }) => {
  return <Card title="Total Barang Rusak" value={data ?? 0} />;
};
