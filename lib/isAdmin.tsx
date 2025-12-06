import { getCurrentUser } from "./getCurrentUser";
export const isAdmin = async (userId: string | null | undefined) =>  {
  const user = await getCurrentUser(userId as string);

  if (!user) return false;

  return user.role === "ADMIN";
};
