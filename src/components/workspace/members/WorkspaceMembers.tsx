"use client";

import AvatarUser from "@/components/AvatarUser";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePanel } from "@/hooks/use-panel";
import { cn } from "@/lib/utils";
import { MemberProps } from "@/types/member";
import React, { useState } from "react";

interface WorkspaceMembersProps {
    members: MemberProps[];
}

const WorkspaceMembers = ({ members }: WorkspaceMembersProps) => {
    const { profileMemberId, onOpenProfileMember, onClose } =
        usePanel();

    const showPanel = !!profileMemberId;

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel></ResizablePanel>
            {showPanel && (
                <ResizablePanel defaultSize={80}>
                    Details
                </ResizablePanel>
            )}
        </ResizablePanelGroup>
    );
};

export default WorkspaceMembers;
