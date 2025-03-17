import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserWorkspace } from "@/action/workspace/getUserWorkspace";
import { AccountForm } from "@/components/setup/AccountForm";
import { auth } from "@/lib/auth";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const data = await getUserWorkspace();

    if (!session) {
        redirect("/auth");
    }

    if (data?.onboardingCompleted && data?.workspaces.length > 0) {
        redirect("/team");
    } else if (data?.onboardingCompleted) {
        redirect("/create-workspace");
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <AccountForm
                name={session.user.name}
                email={session.user.email as string}
                image={session.user.image || ""}
            />
        </div>
    );
};

export default Page;
