"use client";

import { deleteTask } from "@/action/task/deleteTask";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    EllipsisVertical,
    SquareArrowOutUpRight,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import { TaskTableItem } from "./Columns";
import { useState } from "react";

interface ActionTableProps {
    row: Row<TaskTableItem>;
}
const ActionTable = ({ row }: ActionTableProps) => {
    const workspaceId = useWorkspaceId();

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);

    const taskId = row.original.id;
    const { mutate: onSubmit } = useMutation({
        mutationFn: async () => {
            await deleteTask(taskId, workspaceId as string);
        },
        onSuccess: () => {
            toast.success("Công việc đã được xóa.");
            router.refresh();
        },
        onError: () => {
            toast.error("Đã xảy ra lỗi khi xóa công việc.");
        },
    });
    return (
        <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                    <EllipsisVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link
                        href={`/team/${row.original.project.workspaceId}/project/${row.original.project.id}/${row.original.id}`}
                        className="text-primary"
                    >
                        <SquareArrowOutUpRight className="text-primary" />{" "}
                        Xem công việc
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() => {
                            onSubmit();
                            setOpen(false);
                        }}
                        className="w-full justify-start gap-1.5 text-destructive hover:text-destructive"
                    >
                        <Trash2 className="size-4 text-destructive" />
                        Xóa công việc
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionTable;
