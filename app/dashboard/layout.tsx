import { getSessionAction, userHasCompanyAction } from "@/src/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSessionAction();

  if (!session.data?.user) {
    redirect("/login");
  }

  await userHasCompanyAction({ userId: session.data.user.id });
  return (
    <>
      <div>DashboardLayout</div>
      {children}
    </>
  );
};

export default DashboardLayout;
