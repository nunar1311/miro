"use client";

import { resetInviteCode } from "@/action/workspace/resetInviteCode";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, CopyIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

interface SharingTeamProps {
    team: {
        workspaceId: string;
        inviteCode: string;
    };
}

const SharingTeam = ({ team }: SharingTeamProps) => {
    const [copied, setCopied] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1500);
        }
    };

    const { mutate: handleReset, isPending } = useMutation({
        mutationFn: async () => {
            await resetInviteCode(team.workspaceId);
        },
        onSuccess: () => {
            toast.success("Liên kết đã được làm mới.");
            router.refresh();
        },
        onError: () => {
            toast.error("Đã xảy ra lỗi khi làm mới liên kết.");
        },
    });

    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${team.workspaceId}/join/${team.inviteCode}`;
    return (
        <Card className="bg-accent/20">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">
                    Cộng tác viên
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            className="pe-9"
                            value={inviteLink}
                            placeholder="Tên nhóm"
                            readOnly
                            disabled
                        />
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={handleCopy}
                                        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                        aria-label={
                                            copied
                                                ? "Copied"
                                                : "Copy to clipboard"
                                        }
                                        disabled={copied || isPending}
                                    >
                                        <div
                                            className={cn(
                                                "transition-all",
                                                copied
                                                    ? "scale-100 opacity-100"
                                                    : "scale-0 opacity-0",
                                            )}
                                        >
                                            <CheckIcon
                                                className="stroke-emerald-500"
                                                size={16}
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div
                                            className={cn(
                                                "absolute transition-all",
                                                copied
                                                    ? "scale-0 opacity-0"
                                                    : "scale-100 opacity-100",
                                            )}
                                        >
                                            <CopyIcon
                                                size={16}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className="px-2 py-1 text-xs">
                                    Sao chép liên kết
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Button
                        className="w-fit"
                        onClick={() => handleReset()}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className=" animate-spin shrink-0" />
                        ) : null}
                        Tạo liên kết mới
                    </Button>
                </div>
                <CardDescription>
                    Mời những cộng tác viên bên ngoài tham gia nhóm
                    này. Những cộng tác viên hiện tại được liệt kê bên
                    dưới.
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default SharingTeam;
