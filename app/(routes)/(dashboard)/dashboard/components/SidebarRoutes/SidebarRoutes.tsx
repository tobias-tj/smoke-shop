import { SidebarItem } from "./SidebarItem";
import { dataAdminSidebar, dataGeneralSidebar } from "./SidebarRoutes.data";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/getCurrentUser";

interface SidebarRoutesProps {
  userId: string;
}

export default async function SidebarRoutes({ userId }: SidebarRoutesProps) {
  const user = await getCurrentUser(userId);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-500">General</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.title} item={item}/>
          ))}

          <Separator className="my-4 border-gray-300" />

          {user?.role === "ADMIN" && (
            <div>
              <p className="mb-2 text-slate-500">ADMIN</p>
              {dataAdminSidebar.map((item) => (
                <SidebarItem key={item.title} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
