"use server";

import { getAuthSession } from "../user/getAuthSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { AccessLevel } from "@prisma/client";

export const deleteTeam = async (workspaceId: string) => {
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
            throw new Error("Bạn không phải là thành viên của nhóm");
        }

        if (
            userMember &&
            userMember.accessLevel !== AccessLevel.OWNER
        ) {
            throw new Error("Chỉ chủ nhóm mới có thể xóa nhóm");
        }

        await prisma.workspace.delete({
            where: {
                id: workspaceId,
            },
        });
    } catch {}
};
