"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import WorkspaceSwitcher from "./workspace/WorkspaceSwitcher";
import {
    FastForward,
    Folder,
    Forward,
    MoreHorizontal,
    Plus,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { $Enums, User } from "@prisma/client";
import { useCreateWorkspaceModal } from "@/store/use-create-workspace-modal";
import UserDropdown from "./UserDropdown";
import Navigation from "./Navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCreateProjectModal } from "@/store/use-create-project-modal";
import { ProjectProps } from "@/types/project";
import { usePathname, useRouter } from "next/navigation";

interface SidebarsProps extends User {
    workspaces: {
        id: string;
        name: string;
        userId: string;
        workspaceId: string;
        createdAt: Date;
        accessLevel: $Enums.AccessLevel;
        workspace: {
            name: string;
        };
    }[];
}

const Sidebars = ({
    data,
    dataProject,
    workspaceId,
}: {
    data: SidebarsProps;
    dataProject: ProjectProps[];
    workspaceId: string;
}) => {
    const [workspace, setWorkspace] = useCreateWorkspaceModal();
    const [project, setProject] = useCreateProjectModal();

    const router = useRouter();
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-12 bg-background">
                <Link
                    href={"/workspace"}
                    className="bg-background flex items-center text-3xl gap-2"
                >
                    <FastForward className="fill-current text-primary -rotate-45 size-7 mb-1" />
                </Link>
            </SidebarHeader>
            <SidebarContent className="bg-background hidden-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
                    <SidebarGroupAction
                        onClick={() => setWorkspace(!workspace)}
                    >
                        <Plus />{" "}
                        <span className="sr-only">
                            Thêm workspace
                        </span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <WorkspaceSwitcher
                                    workspaces={data.workspaces}
                                />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <Navigation />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Dự án</SidebarGroupLabel>
                    <SidebarGroupAction
                        onClick={() => setProject(!project)}
                    >
                        <Plus />{" "}
                        <span className="sr-only">Thêm dự án</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dataProject.map((project) => {
                                const href = `/team/${workspaceId}/project/${project.id}`;
                                const isActive = pathname === href;
                                return (
                                    <SidebarMenuItem key={project.id}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            asChild
                                        >
                                            <Link href={href}>
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            project.color,
                                                    }}
                                                    className="w-5 h-5 rounded-md"
                                                ></div>
                                                <span>
                                                    {project.name}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                asChild
                                            >
                                                <SidebarMenuAction
                                                    showOnHover
                                                >
                                                    <MoreHorizontal />
                                                    <span className="sr-only">
                                                        More
                                                    </span>
                                                </SidebarMenuAction>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-48 rounded-lg"
                                                side="right"
                                                align="start"
                                            >
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        router.push(
                                                            href,
                                                        );
                                                    }}
                                                >
                                                    <Folder className="text-muted-foreground" />
                                                    <span>
                                                        View Project
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Forward className="text-muted-foreground" />
                                                    <span>
                                                        Share Project
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Trash2 className="text-muted-foreground" />
                                                    <span>
                                                        Delete Project
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuItem>
                                );
                            })}
                            {/* <SidebarMenuItem>
                                <SidebarMenuButton>

                                    <div className="w-5 h-5 rounded-md bg-blue-500"></div>
                                    <span>Project 1</span>
                                </SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction
                                            showOnHover
                                        >
                                            <MoreHorizontal />
                                            <span className="sr-only">
                                                More
                                            </span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-48 rounded-lg"
                                        side="right"
                                        align="start"
                                    >
                                        <DropdownMenuItem>
                                            <Folder className="text-muted-foreground" />
                                            <span>View Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Forward className="text-muted-foreground" />
                                            <span>Share Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Trash2 className="text-muted-foreground" />
                                            <span>
                                                Delete Project
                                            </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem> */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-background">
                <UserDropdown user={data} />
            </SidebarFooter>
        </Sidebar>
    );
};

export default Sidebars;
