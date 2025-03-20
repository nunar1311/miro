"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface TabsSettingProps {
    basePath: string;
}

const TabsSetting = ({ basePath }: TabsSettingProps) => {
    const pathname = usePathname();
    const tabs = [
        {
            name: "Tổng quan",
            href: `general`,
        },
        {
            name: "Cộng tác viên",
            href: `sharing`,
        },
        {
            name: "Xoá",
            href: `delete`,
        },
    ];

    return (
        <div className="w-full flex flex-row">
            <div className="flex w-full flex-col border-l p-0">
                {tabs.map((tab) => {
                    const href = `${basePath}/${tab.href}`;
                    const isActive = href === pathname;
                    return (
                        <Link
                            href={href}
                            key={tab.name}
                            className={cn(
                                "relative w-full justify-start px-3 py-1.5 flex items-center text-sm",
                                "hover:text-primary transition-colors",
                                "after:absolute after:inset-y-0 after:start-0 after:w-0.5",
                                isActive
                                    ? "after:bg-primary"
                                    : "text-muted-foreground",
                            )}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TabsSetting;
