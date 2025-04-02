/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { File, Project, Task, User } from "@prisma/client";
import DataTable from "./DataTable";
import { columns } from "./Columns";

export interface TaskProps extends Task {
    assigneeTo: User;
    project: Project;
    attachments: File[];
}

const ProjectTable = ({ task }: { task: TaskProps }) => {
    return <DataTable columns={columns} data={task as any} />;
};

export default ProjectTable;
