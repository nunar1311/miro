import { getTeam } from "@/action/workspace/getTeam";
import SettingsForm from "@/components/workspace/SettingsForm";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";

const Page = async ({
    params,
}: {
    params: Promise<{ workspaceId: string }>;
}) => {
    const { workspaceId } = await params;
    const team = await getTeam(workspaceId);
    return <SettingsForm data={team} />;
};

export default Page;
