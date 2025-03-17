"use server";

import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";
import prisma from "@/lib/prisma";

export const getMemberTeam = async (workspaceId: string) => {
    try {
        const session = await getAuthSession();
        if (!session) {
            redirect("/auth");
        }

        const userMenber = await prisma.member.findUnique({
            where: {
                userId_workspaceId: {
                    userId: session.user.id,
                    workspaceId,
                },
            },
        });

        if (!userMenber) {
            throw new Error("Bạn không phải là thành viên của nhóm");
        }

        const [membersTeam, projectsTeam] = await Promise.all([
            prisma.member.findMany({
                where: {
                    workspaceId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    projectAccess: {
                        select: {
                            id: true,
                            hasAccess: true,
                            projectId: true,
                        },
                    },
                },
            }),

            prisma.project.findMany({
                where: {
                    workspaceId,
                },
                select: {
                    id: true,
                    name: true,
                },
            }),
        ]);

        return { membersTeam, projectsTeam };
    } catch {}
};
