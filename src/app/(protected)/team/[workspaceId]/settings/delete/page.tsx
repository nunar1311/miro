import { getTeam } from "@/action/workspace/getTeam";
import DeleteTeam from "@/components/workspace/settings/DeleteTeam";
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
        <DeleteTeam teamId={workspace?.id} name={workspace?.name} />
    );
};

export default Page;
