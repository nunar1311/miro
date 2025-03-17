"use client";

import { ProjectProps } from "@/types/project";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Settings } from "lucide-react";
import { useCreateTaskModal } from "@/store/use-create-task-modal";

const ProjectHeader = ({ project }: { project: ProjectProps }) => {
    const [modal, setModal] = useCreateTaskModal();
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
                <div
                    style={{
                        backgroundColor: project.color,
                    }}
                    className="size-10 rounded-md"
                ></div>
                <Label className="text-3xl font-semibold">
                    {project.name}
                </Label>

                {project.description && (
                    <p className="text-sm text-muted-foreground">
                        {project.description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Button onClick={() => setModal(!modal)}>
                    <Plus />
                    <span>Thêm công việc</span>
                </Button>
                <Button variant={"outline"}>
                    <Settings />
                    <span>Cài đặt</span>
                </Button>
            </div>
        </div>
    );
};

export default ProjectHeader;
