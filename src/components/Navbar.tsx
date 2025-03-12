"use client";

import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    const getPageLabel = (pathname: string) => {
        if (pathname.includes("project")) return "Dự án";
        if (pathname.includes("task")) return "Công việc";
        if (pathname.includes("member")) return "Thành viên";
        if (pathname.includes("setting")) return "Cài đặt";
        return null;
    };

    const pageHeading = getPageLabel(pathname);

    return (
        <nav className="flex sticky top-0 z-50 h-14 shrink-0 items-center gap-2 transition-[width, height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 h-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            {pageHeading ? (
                                <BreadcrumbLink asChild>
                                    <Link
                                        href={`/workspace/${workspaceId}`}
                                    >
                                        Trang chủ
                                    </Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage className="line-clamp-1">
                                    Trang chủ
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {pageHeading && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        {pageHeading}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </nav>
    );
};

export default Navbar;
