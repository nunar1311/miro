"use client";

import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { ColumnKanbanProps, ProjectTaskProps } from "@/types/project";
import { useCallback, useEffect, useState } from "react";
import { $Enums, TaskStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { TasksStatusVariant } from "@/lib/data/status";
import { Separator } from "../ui/separator";
import ProjectCard from "./ProjectCard";

import { updateTaskPosition } from "@/action/task/updateTaskPosition";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

interface ProjectKanbanProps {
    initialTasks: ProjectTaskProps[];
}

const COLUMN_TITLE: Record<$Enums.TaskStatus, string> = {
    TODO: "Chưa thực hiện",
    IN_PROGRESS: "Đang thực hiện",
    DONE: "Hoàn thành",
    BLOCKED: "Bị chặn",
    BACKLOG: "Kế hoạch",
    IN_REVIEW: "Đang xem xét",
};

const ProjectKanban = ({ initialTasks }: ProjectKanbanProps) => {
    const router = useRouter();
    const [columns, setColumns] = useState<ColumnKanbanProps[]>([]);

    useEffect(() => {
        const initialColumns: ColumnKanbanProps[] = Object.entries(
            COLUMN_TITLE,
        ).map(([status, title]) => ({
            id: status as TaskStatus,
            title,
            tasks: initialTasks
                .filter((task) => task.status === status)
                .sort((a, b) => a.position - b.position),
        }));

        setColumns(initialColumns);
    }, [initialTasks]);

    const onDragEnd = useCallback(
        async (result: DropResult) => {
            const { destination, source } = result;

            if (!destination) {
                return;
            }

            const newColumns = [...columns];

            const sourceColumn = newColumns.find(
                (col) => col.id === source.droppableId,
            );

            const destColumn = newColumns.find(
                (col) => col.id === destination.droppableId,
            );

            if (!sourceColumn || !destColumn) {
                return;
            }

            const [movedTask] = sourceColumn.tasks.splice(
                source.index,
                1,
            );

            const destinationTasks = destColumn.tasks;

            let newPosition: number;

            if (destinationTasks.length === 0) {
                newPosition = 1000;
            } else if (destination.index === 0) {
                newPosition = destinationTasks[0].position - 1000;
            } else if (
                destination.index === destinationTasks.length
            ) {
                newPosition =
                    destinationTasks[destinationTasks.length - 1]
                        .position + 1000;
            } else {
                newPosition =
                    (destinationTasks[destination.index - 1]
                        .position +
                        destinationTasks[destination.index]
                            .position) /
                    2;
            }

            const updateTask = {
                ...movedTask,
                position: newPosition,
                status: destination.droppableId as TaskStatus,
            };

            destColumn.tasks.splice(destination.index, 0, updateTask);

            setColumns(newColumns);

            try {
                await updateTaskPosition(
                    movedTask.id,
                    newPosition,
                    destination.droppableId as TaskStatus,
                );

                toast.success(
                    "Cập nhật trạng thái công việc thành công",
                );
                router.refresh();
            } catch {
                toast.error("Cập nhật trạng thái công việc thất bại");
            }
        },
        [columns, router],
    );
    return (
        <div className="flex justify-around h-full gap-2 overflow-x-auto mt-2">
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className="flex flex-col w-1/5 h-[calc(100vh-11rem)] bg-muted/25 rounded-md"
                    >
                        <div className="flex items-center px-2 h-10">
                            <div className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "size-4 rounded",
                                        TasksStatusVariant[
                                            column.id as TaskStatus
                                        ],
                                    )}
                                ></div>
                                <h2 className="font-semibold">
                                    {column.title}
                                </h2>
                            </div>
                        </div>
                        <Separator />

                        <ScrollArea className="hidden-scrollbar h-[calc(100vh-14rem)]">
                            <Droppable droppableId={column.id}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex-1 rounded-lg p-1 space-y-1"
                                    >
                                        {column.tasks.map(
                                            (task, index) => (
                                                <Draggable
                                                    draggableId={
                                                        task.id
                                                    }
                                                    key={task.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <ProjectCard
                                                            provider={
                                                                provided
                                                            }
                                                            task={
                                                                task
                                                            }
                                                        />
                                                    )}
                                                </Draggable>
                                            ),
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </ScrollArea>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
};

export default ProjectKanban;
