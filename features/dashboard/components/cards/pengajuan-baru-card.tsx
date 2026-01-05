import Card from "@/shared/organism/card";

export const PengajuanBaruCard = ({ data }: { data?: number }) => {
  return <Card title="Pengajuan Baru" value={data ?? 0} />;
};
