import { TaskPriority } from "@prisma/client";

export const PriorityLevels = [
    {
        priority: TaskPriority.LOW,
        label: "Thấp",
    },
    {
        priority: TaskPriority.MEDIUM,
        label: "Trung bình",
    },
    {
        priority: TaskPriority.HIGH,
        label: "Cao",
    },
    {
        priority: TaskPriority.CRITICAL,
        label: "Rất cao",
    },
];
