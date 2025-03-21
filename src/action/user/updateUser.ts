"use server";

import prisma from "@/lib/prisma";
import { userType, userSchema } from "@/lib/schema";
import { redirect } from "next/navigation";
import { getAuthSession } from "./getAuthSession";

export const updateUser = async (data: userType) => {
    try {
        const session = await getAuthSession();

        const user = session?.user;

        if (!user) {
            redirect("/auth");
        }

        const validatedData = userSchema.parse(data);

        const userData = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                id: user.id,
                email: user.email as string,
                name: validatedData.name,
                about: validatedData.about,
                country: validatedData.country,
                industryType: validatedData.industryType,
                role: validatedData.role,
                onboardingCompleted: true,
                image: user.image || "",
                subscription: {
                    create: {
                        plan: "FREE",
                        status: "ACTIVE",
                        currentPeriodEnd: new Date(),
                        cancelAtPeriodEnd: false,
                    },
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
                workspaces: true,
            },
        });

        return userData;
    } catch {}
};
