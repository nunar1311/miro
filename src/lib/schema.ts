import { TaskPriority, TaskStatus } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email("Email không hợp lệ"),
    about: z.string().optional(),
    country: z.string().min(1, "Quốc gia không hợp lệ").optional(),
    industryType: z
        .string()
        .min(1, "Ngành nghề không hợp lệ")
        .optional(),
    role: z.string().min(1, "Vai trò không hợp lệ").optional(),
    image: z.string().optional(),
});

export type userType = z.infer<typeof userSchema>;

export const workspaceSchema = z.object({
    name: z.string().min(3, "Tên Workspace phải tối thiểu 3 ký tự"),
    description: z.string().min(3, "Mô tả phải tối thiểu 3 ký tự"),
});

export type workspaceType = z.infer<typeof workspaceSchema>;

export const projectSchema = z.object({
    workspaceId: z.string(),
    name: z.string().min(3, "Tên dự án phải tối thiểu 3 ký tự"),
    description: z.string().min(3, "Mô tả phải tối thiểu 3 ký tự"),
    color: z.string(),
    memberAccess: z.array(z.string()).optional(),
});

export type projectType = z.infer<typeof projectSchema>;

export const inviteSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
});

export type inviteType = z.infer<typeof inviteSchema>;

export const taskSchema = z.object({
    title: z.string().min(3, "Tiêu đề phải tối thiểu 3 ký tự"),
    description: z.string().optional(),
    assigneeId: z.string().optional(),
    status: z.nativeEnum(TaskStatus),
    projectId: z.string(),
    priority: z.nativeEnum(TaskPriority),
    dueDate: z.date(),
    startDate: z.date(),
    attachments: z
        .array(
            z.object({
                name: z.string(),
                url: z.string(),
                type: z.enum(["IMAGE", "FILE"]),
            }),
        )
        .optional(),
});

export type taskType = z.infer<typeof taskSchema>;
