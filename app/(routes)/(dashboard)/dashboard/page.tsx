import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/after-signup");
  }

  const user = await db.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    redirect("/after-signup");
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">List of Products</h2>
      </div>
    </div>
  );
}
