import Card from "@/shared/organism/card";

export const TotalPeminjamanCard = ({ data }: { data?: number }) => {
  return <Card title="Total Peminjaman" value={data ?? 0} />;
};
