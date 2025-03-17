import { getUserWorkspace } from "@/action/workspace/getUserWorkspace";
import { CreateWorkspaceForm } from "@/components/workspace/CreateWorkspaceForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/auth");
    }

    const data = await getUserWorkspace();

    if (!data?.onboardingCompleted) {
        return redirect("/onboarding");
    } else if (data?.workspaces.length > 0) {
        return redirect(`/team/${data.workspaces[0].workspaceId}`);
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <CreateWorkspaceForm />
        </div>
    );
};

export default Page;
