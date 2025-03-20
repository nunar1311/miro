"use server";

import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";
import prisma from "@/lib/prisma";
import { generateCode } from "@/lib/generateCode";

export const resetInviteCode = async (workspaceId: string) => {
    try {
        const session = await getAuthSession();
        if (!session) {
            redirect("/auth");
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
            throw new Error("User is not a member of this workspace");
        }

        await prisma.workspace.update({
            where: {
                id: workspaceId,
            },
            data: {
                inviteCode: generateCode(),
            },
        });
    } catch {}
};
