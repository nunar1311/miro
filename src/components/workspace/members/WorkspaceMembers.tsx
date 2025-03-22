"use client";

import AvatarUser from "@/components/AvatarUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePanel } from "@/hooks/use-panel";
import { cn } from "@/lib/utils";
import { MemberProps } from "@/types/member";
import { EllipsisVertical, X } from "lucide-react";

interface WorkspaceMembersProps {
    members: MemberProps[];
}

const WorkspaceMembers = ({ members }: WorkspaceMembersProps) => {
    const { profileMemberId, onOpenProfileMember, onClose } =
        usePanel();

    const showPanel = !!profileMemberId;

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <div className="max-w-3xl mx-auto w-full p-3 md:p-6 space-y-4">
                    <div className="flex flex-col">
                        <Label className="text-3xl font-semibold">
                            Thành viên
                        </Label>
                        <p className="text-muted-foreground text-sm">
                            Quản lý thành viên trong team và quyền
                            truy cập
                        </p>
                    </div>
                    <Card className="p-4 gap-0">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className={cn(
                                    "flex items-center justify-between",
                                    "cursor-pointer",
                                    "hover:bg-sidebar-accent rounded-md",
                                    "p-2",
                                )}
                            >
                                <div className="flex items-center space-x-4">
                                    <AvatarUser
                                        user={{
                                            name: member.user.name,
                                            image:
                                                member.user.image ||
                                                "",
                                        }}
                                        size="lg"
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex items-center space-x-2">
                                            <p className="font-semibold">
                                                {member.user.name}{" "}
                                            </p>
                                            <Badge
                                                className={cn(
                                                    "text-white",
                                                    member.accessLevel ===
                                                        "OWNER" &&
                                                        "bg-blue-500",
                                                    member.accessLevel ===
                                                        "MEMBER" &&
                                                        "bg-green-500",
                                                )}
                                            >
                                                {member.accessLevel ===
                                                "OWNER"
                                                    ? "Chủ sở hữu"
                                                    : member.accessLevel ===
                                                      "MEMBER"
                                                    ? "Thành viên"
                                                    : "Chỉ xem"}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {
                                                member.projectAccess
                                                    .length
                                            }{" "}
                                            dự án
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        onOpenProfileMember(
                                            member.userId as string,
                                        )
                                    }
                                >
                                    <EllipsisVertical className="size-4" />
                                </Button>
                            </div>
                        ))}
                    </Card>
                </div>
            </ResizablePanel>
            {showPanel && (
                <ResizablePanel defaultSize={50}>
                    <div className="p-6 flex flex-col space-y-4 justify-between">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <Label className="text-3xl font-semibold">
                                    Thông tin thành viên
                                </Label>
                                <p className="text-muted-foreground text-sm">
                                    Quản lý thành viên trong team và
                                    quyền truy cập
                                </p>
                            </div>

                            <Button
                                variant={"ghost"}
                                onClick={onClose}
                            >
                                <X className="shrink-0" />
                            </Button>
                        </div>
                        <Card className="p-4">
                            <p>Profile</p>
                        </Card>
                    </div>
                </ResizablePanel>
            )}
        </ResizablePanelGroup>
    );
};

export default WorkspaceMembers;
