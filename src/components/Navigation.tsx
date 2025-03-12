"use client";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    LucideIcon,
    SettingsIcon,
    SquareCheckBig,
    UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";

type ItemType = {
    label: string;
    href: string;
    icon: LucideIcon;
};

const routes: ItemType[] = [
    {
        label: "Trang chủ",
        href: "",
        icon: LayoutDashboard,
    },
    {
        label: "Công việc",
        href: "/tasks",
        icon: SquareCheckBig,
    },
    {
        label: "Thành viên",
        href: "/members",
        icon: UsersIcon,
    },
    {
        label: "Cài đặt",
        href: "/settings",
        icon: SettingsIcon,
    },
];

const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    return (
        <SidebarMenu>
            <div className="flex flex-col gap-y-1">
                {routes.map((item) => {
                    const fullHref = `/workspace/${workspaceId}${item.href}`;
                    const Icon = item.icon;

                    return (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                                isActive={fullHref === pathname}
                                asChild
                            >
                                <Link href={fullHref}>
                                    <Icon className={cn("size-10")} />
                                    <p className="text-sm">
                                        {item.label}
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </div>
        </SidebarMenu>
    );
};

export default Navigation;
