"use client";

import {
    CommentProps,
    ProjectProps,
    TaskDistribution,
} from "@/types/project";
import { Activity } from "@prisma/client";
import { Card } from "../ui/card";
import TaskDistributionChart from "./TaskDistributionChart";

interface DashboardProjectProps {
    project: ProjectProps;
    tasks: TaskDistribution;
    activities: Activity[];
    totalMembers: number;
    comments: CommentProps[];
}

const DashboardProject = ({
    project,
    tasks,
    activities,
    totalMembers,
    comments,
}: DashboardProjectProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                <Card className="p-4">
                    <div className="flex flex-col items-start justify-between">
                        <span className="text-sm text-muted-foreground">
                            Công việc hoàn thành
                        </span>
                        <span className="text-3xl font-semibold">
                            {tasks?.done}
                        </span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex flex-col items-start justify-between">
                        <span className="text-sm text-muted-foreground">
                            Công việc đang thực hiện
                        </span>
                        <span className="text-3xl font-semibold">
                            {tasks?.inProgress}
                        </span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex flex-col items-start justify-between">
                        <span className="text-sm text-muted-foreground">
                            Công việc quá hạn
                        </span>
                        <span className="text-3xl font-semibold">
                            {tasks?.overdue}
                        </span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex flex-col items-start justify-between">
                        <span className="text-sm text-muted-foreground">
                            Thành viên
                        </span>
                        <span className="text-3xl font-semibold">
                            {totalMembers || 0}
                        </span>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TaskDistributionChart tasks={tasks} />
                <Card className="p-4"></Card>
                <Card className="p-4"></Card>
            </div>
        </div>
    );
};

export default DashboardProject;
