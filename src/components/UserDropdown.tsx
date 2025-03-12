"use client";

import { useRef, useState } from "react";
import { User } from "@prisma/client";
import { useTheme } from "next-themes";
import {
    ArrowLeft,
    ChevronRight,
    Ellipsis,
    Moon,
    Sun,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import { useOnClickOutside } from "../hooks/use-on-click-outside";
import { cn } from "../lib/utils";

import { SidebarMenuButton } from "./ui/sidebar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface UserDropdownProps extends AvatarProps {
    user?: Pick<User, "name" | "image" | "email">;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
    const [showMoreToggle, setShowMoreToggle] =
        useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth");
                },
            },
        });
    };

    const ref = useRef<HTMLDivElement>(null!);

    useOnClickOutside(ref, () => {
        setOpen(false);
        setShowMoreToggle(false);
    });

    return (
        <DropdownMenu open={open}>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    onClick={() => setOpen(!open)}
                >
                    <Avatar className="size-8 rounded-lg">
                        <AvatarImage
                            src={user?.image || ""}
                            alt={user?.name}
                        />
                        <AvatarFallback className="rounded-lg font-bold bg-primary text-accent">
                            {user?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            {user?.name}
                        </span>
                        <span className="truncate text-xs">
                            {user?.email}
                        </span>
                    </div>
                    <Ellipsis className="size-5 shrink-0" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                side="right"
                sideOffset={-4}
                ref={ref}
                className={cn(
                    "z-[100] ml-2 h-[219px] w-60 transition-all duration-150 ease-out rounded-lg",
                    !open && "hidden",
                    showMoreToggle ? "h-[94px] w-72" : null,
                )}
            >
                {!showMoreToggle && (
                    <>
                        <DropdownMenuItem
                            onClick={() => setShowMoreToggle(true)}
                            className="flex items-center justify-between px-2 py-2.5"
                        >
                            <div className="text-sm font-semibold">
                                Giao diện
                            </div>
                            <ChevronRight className="size-5" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-between px-2 py-2.5">
                            <div className="text-sm font-semibold">
                                Hồ sơ
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-between px-2 py-2.5">
                            <div className="text-sm font-semibold">
                                Thanh toán
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-between px-2 py-2.5">
                            <div className="text-sm font-semibold">
                                Thông báo
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <button
                                onClick={() => signOut()}
                                className="w-full px-2 py-2.5 text-sm font-semibold"
                            >
                                Đăng xuất
                            </button>
                        </DropdownMenuItem>
                    </>
                )}
                {showMoreToggle && (
                    <div className="flex flex-col gap-2">
                        <div className="flex w-full items-center px-2 py-2 font-semibold">
                            <div
                                onClick={() =>
                                    setShowMoreToggle(false)
                                }
                                className="absolute top-0 flex h-12 w-12 items-center justify-center"
                            >
                                <ArrowLeft className="size-5" />
                            </div>
                            <div className="flex-1 text-center text-sm">
                                Giao diện
                            </div>
                        </div>

                        <Tabs defaultValue={theme}>
                            <TabsList className="h-[40px] w-full rounded-md">
                                <TabsTrigger
                                    value="light"
                                    className="h-full w-1/3 rounded-md"
                                    onClick={() => setTheme("light")}
                                >
                                    <Sun className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="dark"
                                    className="h-full w-1/3 rounded-md"
                                    onClick={() => setTheme("dark")}
                                >
                                    <Moon className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="system"
                                    className="h-full w-1/3 rounded-md text-xs"
                                    onClick={() => setTheme("system")}
                                >
                                    Tự động
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
