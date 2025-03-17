"use server";

import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";
import prisma from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";

export const getProjectDetails = async (
    workspaceId: string,
    projectId: string,
) => {
    try {
        const session = await getAuthSession();

        if (!session) redirect("/auth");

        const [userMember, totalMembers] = await Promise.all([
            prisma.member.findUnique({
                where: {
                    userId_workspaceId: {
                        userId: session.user.id,
                        workspaceId,
                    },
                },
            }),
            prisma.member.count({
                where: {
                    workspaceId,
                },
            }),
        ]);

        if (!userMember) {
            throw new Error("You are not a member of this workspace");
        }

        const [project, comments] = await Promise.all([
            prisma.project.findUnique({
                where: {
                    id: projectId,
                },
                include: {
                    projectAccess: {
                        include: {
                            member: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                            image: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    task: {
                        include: {
                            assigneeTo: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                            project: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    activity: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
            }),
            prisma.comment.findMany({
                where: {
                    projectId: projectId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            }),
        ]);

        const tasks = {
            total: project?.task.length,
            done: project?.task.filter(
                (t) => t.status === TaskStatus.DONE,
            ),
            inProgress: project?.task.filter(
                (t) => t.status === TaskStatus.IN_PROGRESS,
            ),
            overDue: project?.task.filter(
                (t) =>
                    t.status !== TaskStatus.DONE &&
                    t.dueDate &&
                    new Date(t.dueDate) < new Date(),
            ).length,
            items: project?.task,
        };

        return {
            project: {
                ...project,
                members: project?.projectAccess.map((p) => p.member),
            },
            tasks,
            activities: project?.activity,
            totalMembers,
            comments,
        };
    } catch {}
};
