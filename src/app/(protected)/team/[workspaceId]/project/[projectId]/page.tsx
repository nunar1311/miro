import { getProjectDetails } from "@/action/project/getProjectDetails";
import DashboardProject from "@/components/project/DashboardProject";
import ProjectHeader from "@/components/project/ProjectHeader";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    CommentProps,
    ProjectProps,
    TaskDistribution,
} from "@/types/project";
import Link from "next/link";
import React from "react";

const Page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ workspaceId: string; projectId: string }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}) => {
    const { workspaceId, projectId } = await params;
    const search = await searchParams;

    const data = await getProjectDetails(workspaceId, projectId);

    return (
        <div className="flex flex-col gap-4 px-10">
            <ProjectHeader
                project={data?.project as unknown as ProjectProps}
            />
            <Tabs
                defaultValue={(search.view as string) || "dashboard"}
                className="w-full"
            >
                <TabsList className="h-auto items-start justify-start w-full rounded-none border-b bg-transparent p-0">
                    <Link href={"?view=dashboard"}>
                        <TabsTrigger
                            value="dashboard"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-accent-foreground"
                        >
                            Chung
                        </TabsTrigger>
                    </Link>
                    <Link href={"?view=table"}>
                        <TabsTrigger
                            value="table"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-accent-foreground"
                        >
                            Danh sách
                        </TabsTrigger>
                    </Link>
                    <Link href={"?view=kanban"}>
                        <TabsTrigger
                            value="kanban"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-accent-foreground"
                        >
                            Bảng
                        </TabsTrigger>
                    </Link>
                    <Link href={"?view=calendar"}>
                        <TabsTrigger
                            value="calendar"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-accent-foreground"
                        >
                            Lịch
                        </TabsTrigger>
                    </Link>
                    <Link href={"?view=timeline"}>
                        <TabsTrigger
                            value="timeline"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-accent-foreground"
                        >
                            Dòng thời gian
                        </TabsTrigger>
                    </Link>
                </TabsList>
                <TabsContent value="dashboard">
                    <DashboardProject
                        project={
                            data?.project as unknown as ProjectProps
                        }
                        tasks={
                            data?.tasks as unknown as TaskDistribution
                        }
                        activities={data?.activities ?? []}
                        totalMembers={data?.totalMembers as number}
                        comments={data?.comments as CommentProps[]}
                    />
                </TabsContent>
                <TabsContent value="table">
                    <p className="text-muted-foreground p-4 text-center text-xs">
                        Content for Tab 2
                    </p>
                </TabsContent>
                <TabsContent value="kanban">
                    <p className="text-muted-foreground p-4 text-center text-xs">
                        Content for Tab 3
                    </p>
                </TabsContent>
                <TabsContent value="calendar">
                    <p className="text-muted-foreground p-4 text-center text-xs">
                        Content for Tab 3
                    </p>
                </TabsContent>
                <TabsContent value="timeline">
                    <p className="text-muted-foreground p-4 text-center text-xs">
                        Content for Tab 3
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Page;
