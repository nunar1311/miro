"use client";

import { cn } from "@/lib/utils";
import { TaskStatus } from "@prisma/client";
import AvatarUser from "../AvatarUser";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { redirect, useRouter } from "next/navigation";

interface EventCardProps {
    id: string;
    title: string;
    project: {
        id: string;
        name: string;
        color: string;
    };
    assigneeTo: {
        id: string;
        name: string;
        image?: string;
    };
    status: TaskStatus;
}

const statusColorMap: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: "border-gray-500",
    [TaskStatus.IN_PROGRESS]: "border-yellow-500",
    [TaskStatus.DONE]: "border-green-500",
    [TaskStatus.BLOCKED]: "border-red-500",
    [TaskStatus.IN_REVIEW]: "border-blue-500",
    [TaskStatus.TODO]: "border-blue-500",
};

const EventCard = ({
    id,
    title,
    project,
    assigneeTo,
    status,
}: EventCardProps) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    if (!workspaceId) return redirect("/team");
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    href={`/team/${workspaceId}/project/${project.id}/${id}`}
                    className={cn(
                        "p-1.5 text-xs bg-accent border rounded-md border-l-6 flex items-center gap-2 gap-y-1.5 cursor-pointer hover:opacity-75 transition",
                        statusColorMap[status],
                    )}
                >
                    <p>{title}</p>

                    <AvatarUser
                        user={{
                            name: assigneeTo.name,
                            image: assigneeTo.image || "",
                        }}
                        size="md"
                    />
                </Link>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="bg-background">
                <Link
                    href={`/team/${workspaceId}/project/${project.id}/${id}`}
                >
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm">{project.name}</p>
                    <p className="text-sm">{assigneeTo.name}</p>
                </Link>
            </HoverCardContent>
        </HoverCard>
    );
};

export default EventCard;
