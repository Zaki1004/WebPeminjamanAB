import Card from "@/shared/organism/card";

export const TotalUserCard = ({ data }: { data?: number }) => {
  return <Card title="Total User" value={data ?? 0} />;
};
