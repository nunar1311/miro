import { getTeam } from "@/action/workspace/getTeam";
import SharingTeam from "@/components/workspace/settings/SharingTeam";
import { redirect } from "next/navigation";
import React from "react";

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
        <SharingTeam
            team={{
                workspaceId: workspace.id,
                inviteCode: workspace.inviteCode || "",
            }}
        />
    );
};

export default Page;
