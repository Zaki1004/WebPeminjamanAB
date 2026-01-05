"use client";

import { DASHBOARD_CARDS } from "@/features/dashboard/config/dashboard-config";
import { getUserPermissions } from "@/lib/auth";

const DashboardPage = () => {
  const permissions = getUserPermissions(); // Ambil role/permission dari JWT

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr h-screen">
      {DASHBOARD_CARDS.filter((card) =>
        card.permissions.some((p) => permissions.includes(p))
      ).map(({ id, component: Component }) => (
        <div key={id} className="h-full">
          <Component />
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
