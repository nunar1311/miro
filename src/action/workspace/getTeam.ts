"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";

export const getTeam = async (workspaceId: string) => {
    try {
        const session = await getAuthSession();

        if (!session) {
            return redirect("/auth");
        }

        const userMember = await prisma.member.findUnique({
            where: {
                userId_workspaceId: {
                    userId: session.user.id,
                    workspaceId: workspaceId,
                },
            },
        });

        if (!userMember) {
            return redirect("/auth");
        }

        const workspace = await prisma.workspace.findUnique({
            where: {
                id: workspaceId,
            },
            include: {
                members: {
                    select: {
                        userId: true,
                        accessLevel: true,
                    },
                },
            },
        });

        return workspace;
    } catch {}
};
