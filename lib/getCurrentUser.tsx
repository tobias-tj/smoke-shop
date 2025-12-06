import { db } from "@/lib/db";

export async function getCurrentUser( userId: string ) {
  return db.user.findUnique({
    where: { id: userId },
  });
}
