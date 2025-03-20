import { getWorkspaceMembers } from "@/action/workspace/getWorkspaceMembers";
import WorkspaceMembers from "@/components/workspace/members/WorkspaceMembers";
import { MemberProps } from "@/types/member";
import { redirect } from "next/navigation";

const Page = async ({
    params,
}: {
    params: Promise<{ workspaceId: string }>;
}) => {
    const { workspaceId } = await params;
    const data = await getWorkspaceMembers(workspaceId);

    if (!data) {
        return redirect("/team");
    }

    return (
        <WorkspaceMembers members={data.members as MemberProps[]} />
    );
};

export default Page;
