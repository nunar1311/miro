import { AccessLevel } from "@prisma/client";

export interface ProjectProps {
    id: string;
    name: string;
    description?: string;
    workspaceId: string;
    members: {
        id: string;
        userId: string;
        workspaceId: string;
        accessLevel: AccessLevel;
        createdAt: Date;
        user: {
            id: string;
            name: string;
            image: string;
            email: string;
        };
    }[];
}
