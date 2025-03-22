"use server";

import { TaskStatus } from "@prisma/client";
import { getAuthSession } from "../user/getAuthSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const updateTaskPosition = async (
    taskId: string,
    newPosition: number,
    status: TaskStatus,
) => {
    try {
        const session = await getAuthSession();

        if (!session) {
            redirect("/auth");
        }

        const task = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                position: newPosition,
                status,
            },
        });

        return task;
    } catch {}
};
