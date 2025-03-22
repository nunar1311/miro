import { getProjectId } from "@/action/project/getProjectId";
import ProjectTable from "./ProjectTable";

const ProjectTableContainer = async ({
    projectId,
}: {
    projectId: string;
}) => {
    const task = await getProjectId(projectId);

    if (!task) {
        return null;
    }

    return <ProjectTable task={task} />;
};

export default ProjectTableContainer;
