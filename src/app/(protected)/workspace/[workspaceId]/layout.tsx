import { getUserWorkspace } from "@/action/workspace/getUserWorkspace";
import Navbar from "@/components/Navbar";
import Sidebars from "@/components/Sidebars";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
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

    if (data?.onboardingCompleted && !data.workspaces) {
        redirect("/create-workspace");
    } else if (!data?.onboardingCompleted) {
        redirect("/onboarding");
    }

    return (
        <SidebarProvider>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Sidebars data={data as any} workspaceId={workspaceId} />
            <SidebarInset>
                <Navbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
