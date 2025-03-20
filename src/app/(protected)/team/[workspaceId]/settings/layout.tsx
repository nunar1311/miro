import TabsSetting from "@/components/TabsSetting";
import { Label } from "@/components/ui/label";
import React, { ReactNode } from "react";

const Layout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ workspaceId: string }>;
}) => {
    const { workspaceId } = await params;
    const basePath = `/team/${workspaceId}/settings`;

    return (
        <div className="max-w-5xl w-full p-3 md:p-6">
            <div className="flex">
                <div className="w-40 shrink-0 mt-20 ml-16">
                    <TabsSetting basePath={basePath} />
                </div>
                <div className="ml-6 flex-grow space-y-6 w-full">
                    <Label className="text-3xl font-semibold">
                        Cài đặt
                    </Label>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
