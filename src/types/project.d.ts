import { AccessLevel, Comment, Task } from "@prisma/client";

export interface ProjectProps {
    id: string;
    name: string;
    description?: string;
    workspaceId: string;
    color: string;
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

export interface CommentProps extends Comment {
    user: { id: string; name: string; image: string };
}

export interface TaskDistribution {
    done: number;
    inProgress: number;
    overdue: number;
    total: number;
    items: Task[];
}

export interface TaskActivity {
    id: string;
    type: string;
    description: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        image: string;
    };
}
