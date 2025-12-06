import { currentUser } from "@clerk/nextjs/server";
import LogoDashboard from "../LogoDashboard/LogoDashboard";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";

export default async function Sidebar() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;


  return (
    <div className="h-screen">
      <div className="flex flex-col h-full border-r">
        <LogoDashboard />
        <SidebarRoutes userId={clerkUser.id}/>
      </div>
    </div>
  );
}
