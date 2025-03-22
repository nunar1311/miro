"use server";

import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";
import prisma from "@/lib/prisma";
import { AccessLevel } from "@prisma/client";

export const deleteTask = async (
    taskId: string,
    workspaceId: string,
) => {
    try {
        const session = await getAuthSession();
        if (!session) {
            redirect("/auth");
        }

        const userMember = await prisma.member.findUnique({
            where: {
                userId_workspaceId: {
                    userId: session.user.id,
                    workspaceId,
                },
            },
        });

        if (!userMember) {
            throw new Error("Permission denied.");
        }

        if (
            userMember &&
            userMember.accessLevel !== AccessLevel.OWNER
        ) {
            throw new Error("Permission denied.");
        }

        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                project: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (task?.projectId) {
            await prisma.activity.create({
                data: {
                    type: "TASK_DELETE",
                    description: `Xóa công việc ${task?.title}`,
                    projectId: task.projectId,
                    userId: session.user.id,
                },
            });
        }

        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });
    } catch {}
};
