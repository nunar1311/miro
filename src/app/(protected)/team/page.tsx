import { getUserWorkspace } from "@/action/workspace/getUserWorkspace";
import { redirect } from "next/navigation";

const Page = async () => {
    const data = await getUserWorkspace();
    if (data?.onboardingCompleted && data.workspaces.length === 0) {
        redirect("/create-workspace");
    } else if (!data?.onboardingCompleted) {
        redirect("/onboarding");
    } else {
        redirect(`/team/${data.workspaces[0].workspaceId}`);
    }
};

export default Page;
