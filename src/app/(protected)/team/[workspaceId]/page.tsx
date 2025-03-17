import { getTeam } from "@/action/workspace/getTeam";
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
    return <div>{workspaceId}</div>;
};

export default Page;
