"use server";

import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";
import prisma from "@/lib/prisma";

export const getProjectId = async (projectId: string) => {
    try {
        const session = await getAuthSession();
        if (!session) redirect("/auth");

        const task = await prisma.task.findMany({
            where: {
                projectId: projectId,
            },
            include: {
                assigneeTo: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        color: true,
                        workspaceId: true,
                    },
                },
                attachments: true,
            },
        });

        return task;
    } catch {}
};
