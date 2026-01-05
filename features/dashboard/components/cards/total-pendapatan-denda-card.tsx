import Card from "@/shared/organism/card";

export const TotalPendapatanDendaCard = ({ data }: { data?: number }) => {
  return <Card title="Total Pendapatan Denda" value={data ?? 0} />;
};
