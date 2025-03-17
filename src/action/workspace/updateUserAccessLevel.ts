"use server";

import { $Enums } from "@prisma/client";
import { getAuthSession } from "../user/getAuthSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const updateUserAccessLevel = async (
    workspaceId: string,
    memberId: string,
    accessLevel: $Enums.AccessLevel,
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
            throw new Error("You are not a member of this workspace");
        }

        if (
            userMember &&
            userMember.accessLevel !== $Enums.AccessLevel.OWNER
        ) {
            throw new Error(
                "You are not authorized to update this workspace",
            );
        }

        await prisma.member.update({
            where: {
                id: memberId,
            },
            data: {
                accessLevel,
            },
        });
    } catch {}
};
