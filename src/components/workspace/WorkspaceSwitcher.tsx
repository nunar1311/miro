"use client";

import { useEffect, useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { SidebarMenuButton } from "../ui/sidebar";
import { ChevronsUpDown, Plus } from "lucide-react";
import { WorkspacesProps } from "@/types/workspaces";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useRouter } from "next/navigation";
import { useCreateWorkspaceModal } from "@/store/use-create-workspace-modal";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface WorkspaceSwitcherProps {
    workspaces: WorkspacesProps[];
}

const WorkspaceSwitcher = ({
    workspaces,
}: WorkspaceSwitcherProps) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [selectWorkspace, setSelectWorkspace] = useState<
        WorkspacesProps | undefined
    >(undefined);

    const [modal, setModal] = useCreateWorkspaceModal();

    const onSelect = (workspaceId: string) => {
        setSelectWorkspace(
            workspaces.find(
                (item) => item.workspaceId === workspaceId,
            ),
        );
        router.push(`/team/${workspaceId}`);
    };

    useEffect(() => {
        if (workspaceId && workspaces) {
            setSelectWorkspace(
                workspaces.find(
                    (item) => item.workspaceId === workspaceId,
                ),
            );
        }
    }, [workspaceId, workspaces]);

    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => {
        setOpen(false);
    });

    return (
        <DropdownMenu open={open}>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size={"lg"}
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    onClick={() => setOpen(!open)}
                >
                    <Avatar className="size-8 rounded-lg bg-primary">
                        <AvatarFallback className="rounded-lg font-bold bg-primary text-accent">
                            {selectWorkspace?.workspace.name
                                .charAt(0)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="truncate font-semibold">
                        {selectWorkspace?.workspace.name}
                    </span>
                    <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-lg"
                align="start"
                side="right"
                sideOffset={4}
                ref={ref}
            >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Team
                </DropdownMenuLabel>
                {workspaces.map((item) => (
                    <DropdownMenuItem
                        key={item.id}
                        onSelect={() => onSelect(item.workspaceId)}
                    >
                        <div className="flex items-center justify-center size-8 rounded-md bg-primary text-accent font-bold">
                            {item.workspace.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>
                        {item.workspace.name}
                        {item.workspaceId === workspaceId && (
                            <div className="size-2 bg-blue-500 rounded-full ml-auto"></div>
                        )}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setModal(!modal);
                        setOpen(false);
                    }}
                >
                    <div className="flex items-center justify-center size-8 rounded-md bg-primary">
                        <Plus className="size-4 text-accent" />
                    </div>
                    <div className="font-medium">Thêm workspace</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default WorkspaceSwitcher;
