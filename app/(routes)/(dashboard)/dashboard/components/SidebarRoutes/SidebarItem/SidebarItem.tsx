"use client";
import { SidebarItemProps } from "./SiderbarItem.types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SidebarItem(props: SidebarItemProps) {
    const {item} = props;
    const {href, icon, title} = item;
    const pathname = usePathname();
    const activePath = pathname === href;

    return (
    <Link href={href} className={cn(
        "flex gap-x-2 mt-2 text-slate-700 text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer",
        activePath && "bg-slate-400/20"
      )}>
        <Image src={icon} alt={title} width={20} height={20} />
        <h2>{title}</h2>
    </Link>
    );
}