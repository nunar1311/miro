"use server";

import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";
import prisma from "@/lib/prisma";

export const getWorkspaceMembers = async (workspaceId: string) => {
    try {
        const session = await getAuthSession();
        if (!session) return redirect("/auth");

        const userMember = await prisma.member.findUnique({
            where: {
                userId_workspaceId: {
                    userId: session.user.id,
                    workspaceId,
                },
            },
        });

        if (!userMember) {
            throw new Error("You are not a member of this workspace");
        }

        const [members, projects] = await Promise.all([
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
                            image: true,
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

        return { members, projects };
    } catch {}
};
