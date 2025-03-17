"use server";

import { taskSchema, taskType } from "@/lib/schema";
import { getAuthSession } from "../user/getAuthSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { FileType, TaskPriority, TaskStatus } from "@prisma/client";

export const createTask = async (
    data: taskType,
    workspaceId: string,
    projectId: string,
) => {
    try {
        const session = await getAuthSession();

        if (!session) {
            redirect("/auth");
        }

        const validatedData = taskSchema.parse(data);

        const userMember = await prisma.member.findUnique({
            where: {
                userId_workspaceId: {
                    userId: session.user.id,
                    workspaceId,
                },
            },
        });

        if (!userMember) {
            throw new Error("User is not a member of this workspace");
        }

        const tasks = await prisma.task.findMany({
            where: {
                projectId,
            },
        });

        const lastTask = tasks
            .filter((task) => task.status === data.status)
            .sort((a, b) => (b.position = a.position))[0];

        const position = lastTask ? lastTask.position + 1000 : 1000;

        const task = await prisma.task.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                startDate: new Date(validatedData.startDate),
                dueDate: new Date(validatedData.dueDate),
                projectId: projectId,
                assigneeId: validatedData.assigneeId,
                status: validatedData.status as TaskStatus,
                priority: validatedData.priority as TaskPriority,
                position: position,
            },
            include: {
                project: true,
            },
        });

        if (
            validatedData.attachments &&
            validatedData.attachments.length > 0
        ) {
            await prisma.file.createMany({
                data: validatedData.attachments.map((attachment) => ({
                    ...attachment,
                    type: attachment.type as FileType,
                    taskId: task.id,
                })),
            });
        }

        await prisma.activity.create({
            data: {
                type: "TASK_CREATED",
                description: `Tạo công việc ${validatedData.title}`,
                projectId,
                userId: session.user.id,
            },
        });
    } catch {}
};
