import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function PostLoginPage() {
  const session = await getServerSession(authOptions);

  // ✅ BELUM LOGIN → TAMPILKAN FORM
  if (!session) {
    return null;
  }

  const { role, mustChangePassword, mustFillEmail } = session.user;

  //   // PRIORITAS RULE
  //   if (mustChangePassword) {
  //     redirect("/change-password");
  //   }

  //   if (mustFillEmail) {
  //     redirect("/complete-profile");
  //   }

  // Ensure role is lowercase for consistent comparison

  switch (session.user.role) {
    case "admin":
      redirect("/admin/dashboard");
    case "superadmin":
      redirect("/super-admin/dashboard");
    case "external":
      redirect("/external/dashboard");
    default:
      redirect("/");
  }
}
