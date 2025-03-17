"use server";

import { $Enums, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";
import prisma from "@/lib/prisma";

export const getProjectByWorkspaceId = async (
    workspaceId: string,
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
            throw new Error("Unauthorized");
        }

        const query: Prisma.ProjectWhereInput =
            userMember.accessLevel === $Enums.AccessLevel.OWNER
                ? { workspaceId }
                : {
                      projectAccess: {
                          some: {
                              hasAccess: true,
                              member: {
                                  userId: session.user.id,
                                  workspaceId,
                              },
                          },
                      },
                  };

        const [projects, members] = await Promise.all([
            prisma.project.findMany({
                where: query,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    workspaceId: true,
                    color: true,
                },
            }),
            prisma.member.findMany({
                where: {
                    workspaceId,
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            id: true,
                            image: true,
                        },
                    },
                },
            }),
        ]);

        return { projects, members };
    } catch {}
};
