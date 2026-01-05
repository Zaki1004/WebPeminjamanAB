import Card from "@/shared/organism/card";

export const TotalAdminCard = ({ data }: { data?: number }) => {
  return <Card title="Total Admin" value={data ?? 0} />;
};
