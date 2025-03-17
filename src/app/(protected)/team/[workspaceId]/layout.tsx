/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProjectByWorkspaceId } from "@/action/project/getProjectByWorkspace";
import { getUserWorkspace } from "@/action/workspace/getUserWorkspace";
import Navbar from "@/components/Navbar";
import Sidebars from "@/components/Sidebars";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { ProjectProps } from "@/types/project";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ workspaceId: string }>;
}) => {
    const data = await getUserWorkspace();
    const { workspaceId } = await params;

    const dataProject = await getProjectByWorkspaceId(workspaceId);

    if (data?.onboardingCompleted && !data.workspaces) {
        redirect("/create-workspace");
    } else if (!data?.onboardingCompleted) {
        redirect("/onboarding");
    }

    return (
        <SidebarProvider>
            <Sidebars
                workspaceId={workspaceId}
                data={data as any}
                dataProject={dataProject?.projects as ProjectProps[]}
            />
            <SidebarInset>
                <Navbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
