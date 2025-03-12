"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserWorkspace = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            redirect("/auth");
        }

        const data = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            include: {
                workspaces: {
                    select: {
                        id: true,
                        userId: true,
                        workspaceId: true,
                        accessLevel: true,
                        createdAt: true,
                        workspace: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return data;
    } catch {}
};
