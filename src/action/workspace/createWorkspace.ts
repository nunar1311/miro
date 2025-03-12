"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { workspaceSchema, workspaceType } from "@/lib/schema";
import { headers } from "next/headers";

const generateCode = () => {
    const code = Array.from(
        { length: 6 },
        () =>
            "0123456789abcdefghijklmnopqrstuvwxyz"[
                Math.floor(Math.random() * 36)
            ],
    ).join("");

    return code;
};

export const createWorkspace = async (data: workspaceType) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            throw new Error("Unauthorized");
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
