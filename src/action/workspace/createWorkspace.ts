"use server";

import prisma from "@/lib/prisma";
import { workspaceSchema, workspaceType } from "@/lib/schema";
import { getAuthSession } from "../user/getAuthSession";
import { redirect } from "next/navigation";
import { generateCode } from "@/lib/generateCode";

export const createWorkspace = async (data: workspaceType) => {
    try {
        const session = await getAuthSession();

        if (!session) {
            redirect("/auth");
        }

        const validatedData = workspaceSchema.parse(data);

        const workspace = await prisma.workspace.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                ownerId: session.user.id,
                inviteCode: generateCode(),
                members: {
                    create: {
                        userId: session.user.id,
                        accessLevel: "OWNER",
                    },
                },
            },
        });

        return workspace;
    } catch {}
};
