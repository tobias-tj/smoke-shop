import { ReactNode } from "react";
import Sidebar from "./dashboard/components/Sidebar/Sidebar";
import { NavbarDashboard } from "./dashboard/components/NavbarDashboard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
   const { userId } = await auth();
  if (!userId) redirect("/after-signup");

  const user = await currentUser();
  if (!user) redirect("/after-signup");

  
    return( 
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 xl:fixed h-full">
        <Sidebar />
      </div>
      <div className="w-full h-full xl:ml-80">
        <NavbarDashboard />
        <div className="p-6 h-max">{children}</div>
      </div>
    </div>
    );
}