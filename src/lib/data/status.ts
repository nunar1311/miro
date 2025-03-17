import { TaskStatus } from "@prisma/client";

export const TaskStatuses = [
    {
        status: TaskStatus.DONE,
        label: "Hoàn thành",
        color: "text-green-500",
    },
    {
        status: TaskStatus.IN_PROGRESS,
        label: "Đang thực hiện",
        color: "text-yellow-500",
    },
    {
        status: TaskStatus.IN_REVIEW,
        label: "Đang xem xét",
        color: "text-blue-500",
    },
    {
        status: TaskStatus.TODO,
        label: "Chưa thực hiện",
        color: "text-blue-500",
    },
    {
        status: TaskStatus.BLOCKED,
        label: "Bị chặn",
        color: "text-red-500",
    },
    {
        status: TaskStatus.BACKLOG,
        label: "Kế hoạch",
        color: "text-gray-500",
    },
];
