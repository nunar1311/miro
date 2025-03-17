"use server";

import { workspaceSchema, workspaceType } from "@/lib/schema";
import { getAuthSession } from "../user/getAuthSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { AccessLevel } from "@prisma/client";

export const updateTeam = async (
    teamId: string,
    data: workspaceType,
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
                    workspaceId: teamId,
                },
            },
        });

        if (!userMember) {
            throw new Error("You are not a member of this workspace");
        }

        if (
            userMember &&
            userMember.accessLevel !== AccessLevel.OWNER
        ) {
            throw new Error(
                "You are not authorized to update this workspace",
            );
        }

        const validatedData = workspaceSchema.parse(data);

        await prisma.workspace.update({
            where: {
                id: teamId,
            },
            data: {
                name: validatedData.name,
                description: validatedData.description,
            },
        });
    } catch {}
};
