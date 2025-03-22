import { Project, TaskPriority, TaskStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import AvatarUser from "../AvatarUser";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import ActionTable from "./ActionTable";

export type TaskTableItem = {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: Date;
    createdAt: Date;
    assigneeTo: {
        name: string;
        image?: string;
    };
    project: Project;
};

export const columns: ColumnDef<TaskTableItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() &&
                        "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Chọn tất cả"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onChange={(value) => row.toggleSelected(!!value)}
                aria-label="Chọn hàng"
            />
        ),
        size: 28,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc",
                    )
                }
            >
                Tên công việc
            </button>
        ),
        cell: ({ row }) => {
            const title = row.getValue("title") as string;

            return (
                <Link
                    href={`/team/${row.original.project.workspaceId}/project/${row.original.project.id}/${row.original.id}`}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium capitalize">
                            {title}
                        </span>
                    </div>
                </Link>
            );
        },
        size: 180,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className={"flex items-center gap-2"}>
                    <Icons.statusDot
                        className={cn(
                            status === TaskStatus.TODO &&
                                TaskStatus.IN_REVIEW &&
                                "text-blue-500",
                            status === TaskStatus.IN_PROGRESS &&
                                "text-yellow-500",
                            status === TaskStatus.DONE &&
                                "text-green-500",
                            status === TaskStatus.BLOCKED &&
                                "text-red-500",
                            status === TaskStatus.BACKLOG &&
                                "text-gray-500",
                        )}
                    />
                    {status === "TODO"
                        ? "Đang chờ"
                        : status === "IN_PROGRESS"
                        ? "Đang thực hiện"
                        : status === "IN_REVIEW"
                        ? "Đang xem xét"
                        : status === "BLOCKED"
                        ? "Bị chặn"
                        : status === "BACKLOG"
                        ? "Kế hoạch"
                        : "Hoàn thành"}
                </div>
            );
        },
        size: 100,
    },
    {
        accessorKey: "priority",
        header: "Độ ưu tiên",
        cell: ({ row }) => {
            const priority = row.getValue("priority") as string;
            return (
                <Badge
                    className={cn(
                        priority === TaskPriority.LOW &&
                            "bg-green-500",
                        priority === TaskPriority.MEDIUM &&
                            "bg-yellow-500",
                        priority === TaskPriority.HIGH &&
                            "bg-orange-500",
                        priority === TaskPriority.CRITICAL &&
                            "bg-red-500",
                    )}
                >
                    {priority === "LOW"
                        ? "Thấp"
                        : priority === "MEDIUM"
                        ? "Trung bình"
                        : priority === "HIGH"
                        ? "Cao"
                        : "Rất cao"}
                </Badge>
            );
        },
        size: 100,
    },
    {
        accessorKey: "startDate",
        header: "Ngày bắt đầu",
        cell: ({ row }) => {
            const startDate = row.getValue("startDate") as Date;
            return <div>{format(startDate, "P")}</div>;
        },
        size: 100,
    },
    {
        accessorKey: "dueDate",
        header: "Hạn cuối",
        cell: ({ row }) => {
            const createdAt = row.getValue("dueDate") as Date;
            return <div>{format(createdAt, "P")}</div>;
        },
        size: 100,
    },
    {
        accessorKey: "assigneeTo",
        header: "Người thực hiện",
        cell: ({ row }) => {
            const assigneeTo = row.getValue("assigneeTo") as {
                name: string;
                image?: string;
            };

            return (
                <div className="flex items-center gap-2">
                    <AvatarUser
                        user={{
                            name: assigneeTo.name,
                            image: assigneeTo.image || "",
                        }}
                        size="md"
                    />
                    <span>{assigneeTo.name}</span>
                </div>
            );
        },
        size: 180,
    },
    {
        accessorKey: "actions",
        header: () => <span className="sr-only">Hành động</span>,
        cell: ({ row }) => {
            return <ActionTable row={row} />;
        },
        size: 60,
        enableHiding: false,
    },
];
