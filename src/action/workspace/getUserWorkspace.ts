"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";

export const getUserWorkspace = async () => {
    try {
        const session = await getAuthSession();

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
