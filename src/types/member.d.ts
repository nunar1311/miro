import { Member } from "@prisma/client";

export interface MemberProps extends Member {
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
    projectAccess: {
        id: string;
        hasAccess: boolean;
        projectId: string;
    }[];
}
