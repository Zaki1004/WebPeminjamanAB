import Card from "@/shared/organism/card";

export const DendaAktifCard = ({ data }: { data?: number }) => {
  return <Card title="Denda Aktif" value={data ?? 0} />;
};
