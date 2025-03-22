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

export const TasksStatusVariant = {
    [TaskStatus.TODO]: "bg-blue-500",
    [TaskStatus.IN_PROGRESS]: "bg-yellow-500",
    [TaskStatus.DONE]: "bg-green-500",
    [TaskStatus.BLOCKED]: "bg-red-500",
    [TaskStatus.BACKLOG]: "bg-gray-500",
    [TaskStatus.IN_REVIEW]: "bg-blue-500",
};
