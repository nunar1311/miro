import { cn } from "@/lib/utils";
import { TaskStatus } from "@prisma/client";
import AvatarUser from "../AvatarUser";

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
    return (
        <div className="px-2">
            <div
                className={cn(
                    "p-1.5 text-xs bg-accent border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
                    statusColorMap[status],
                )}
            >
                <p>{title}</p>
                <div>
                    <AvatarUser
                        user={{
                            name: assigneeTo.name,
                            image: assigneeTo.image || "",
                        }}
                        size="md"
                    />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
