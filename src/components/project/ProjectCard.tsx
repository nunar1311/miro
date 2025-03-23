import { ProjectTaskProps } from "@/types/project";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Card } from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { TaskPriority } from "@prisma/client";
import { Separator } from "../ui/separator";

interface ProjectCardProps {
    provider: DraggableProvided;
    task: ProjectTaskProps;
}

const ProjectCard = ({ provider, task }: ProjectCardProps) => {
    return (
        <Card
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            ref={provider.innerRef}
            className="p-3 shadow-none border-none rounded-md gap-2"
        >
            <Link href={``}>
                <h3 className="font-medium">{task.title}</h3>
            </Link>
            {/* {task.description && (
                <span className="text-xs text-muted-foreground mt-1 line-clamp-3">
                    {task.description}
                </span>
            )} */}
            <Separator />

            <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                    <div
                        style={{
                            backgroundColor: task.project.color,
                        }}
                        className="w-5 h-5 rounded-md bg-amber-200"
                    ></div>
                    <span className="text-xs">
                        {task.project.name}
                    </span>
                </div>
                <Badge
                    className={cn(
                        task.priority === TaskPriority.LOW &&
                            "bg-green-500",
                        task.priority === TaskPriority.MEDIUM &&
                            "bg-yellow-500",
                        task.priority === TaskPriority.HIGH &&
                            "bg-orange-500",
                        task.priority === TaskPriority.CRITICAL &&
                            "bg-red-500",
                    )}
                >
                    {task.priority === "LOW"
                        ? "T"
                        : task.priority === "MEDIUM"
                        ? "TB"
                        : task.priority === "HIGH"
                        ? "C"
                        : "RC"}
                </Badge>
            </div>
        </Card>
    );
};

export default ProjectCard;
