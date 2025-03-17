"use server";

import prisma from "@/lib/prisma";
import { projectSchema, projectType } from "@/lib/schema";
import { redirect } from "next/navigation";
import { getAuthSession } from "../user/getAuthSession";

export const createProject = async (data: projectType) => {
    try {
        const session = await getAuthSession();

        if (!session) {
            redirect("/auth");
        }

        const workspace = await prisma.workspace.findUnique({
            where: {
                id: data.workspaceId,
            },
            include: {
                project: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const validatedData = projectSchema.parse(data);

        const members = await prisma.member.findMany({
            where: {
                workspaceId: workspace?.id,
            },
        });

        const userMember = members.some(
            (m) => m.userId === session.user.id,
        );

        if (!userMember) {
            throw new Error("Unauthorized");
        }

        if (validatedData.memberAccess?.length === 0) {
            validatedData.memberAccess = [session.user.id];
        } else if (
            !validatedData.memberAccess?.includes(session.user.id)
        ) {
            validatedData?.memberAccess?.push(session.user.id);
        }

        console.log(validatedData);

        const project = await prisma.project.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                workspaceId: data.workspaceId,
                color: validatedData.color,
                projectAccess: {
                    create: validatedData.memberAccess?.map(
                        (userId) => ({
                            memberId: members.find(
                                (m) => m.userId === userId,
                            )?.id,
                            hasAccess: true,
                        }),
                    ),
                },
                activity: {
                    create: {
                        type: "PROJECT_CREATED",
                        description: `Tạo dự án ${validatedData.name}`,
                        userId: session.user.id,
                    },
                },
            },
        });

        return project.id;
    } catch {}
};
