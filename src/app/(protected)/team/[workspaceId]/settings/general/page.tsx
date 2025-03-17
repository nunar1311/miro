import { getTeam } from "@/action/workspace/getTeam";
import GeneralTeam from "@/components/workspace/settings/GeneralTeam";
import { redirect } from "next/navigation";

const Page = async ({
    params,
}: {
    params: Promise<{ workspaceId: string }>;
}) => {
    const { workspaceId } = await params;
    const workspace = await getTeam(workspaceId);

    if (!workspace) {
        return redirect("/team");
    }

    return (
        <GeneralTeam
            teamId={workspace.id}
            name={workspace.name}
            description={workspace.description || ""}
        />
    );
};

export default Page;
