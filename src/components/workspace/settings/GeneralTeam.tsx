"use client";

import { updateTeam } from "@/action/workspace/updateTeam";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { workspaceSchema, workspaceType } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, CopyIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface GeneralTeamProps {
    teamId?: string;
    name?: string;
    description?: string;
}

const GeneralTeam = ({
    teamId,
    name,
    description,
}: GeneralTeamProps) => {
    const form = useForm<workspaceType>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: name,
            description: description,
        },
    });
    const [copied, setCopied] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: async (values: workspaceType) => {
            await updateTeam(teamId as string, values);
        },
        onSuccess: () => {
            router.refresh();
            toast.success("Cập nhật nhóm thành công");
        },
        onError: () => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại");
        },
    });

    return (
        <Card className="bg-accent/20">
            <CardHeader>
                <CardTitle className="text-2xl">Tổng quan</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((e) =>
                            onSubmit(e),
                        )}
                    >
                        <div className="flex flex-col gap-4">
                            <div
                                className={cn(
                                    "px-4 py-2 mb-8 border-l-2 border-primary text-sm text-foreground hidden",
                                    form.formState.errors.name &&
                                        "block",
                                    form.formState.errors.description
                                        ?.message && "block",
                                )}
                            >
                                {form.formState.errors.name
                                    ?.message ||
                                    form.formState.errors.description
                                        ?.message}
                            </div>

                            <div className="grid gap-2">
                                <Label className="font-bold">
                                    ID nhóm
                                </Label>
                                <div className="relative">
                                    <Input
                                        ref={inputRef}
                                        className="pe-9"
                                        value={teamId}
                                        placeholder="Tên nhóm"
                                        readOnly
                                        disabled
                                    />
                                    <TooltipProvider
                                        delayDuration={0}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={
                                                        handleCopy
                                                    }
                                                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                                    aria-label={
                                                        copied
                                                            ? "Copied"
                                                            : "Copy to clipboard"
                                                    }
                                                    disabled={copied}
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
                                                Copy to clipboard
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Tên nhóm
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Tên nhóm"
                                                required
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Đây là tên công ty, nhóm
                                            hoặc tổ chức của bạn.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Mô tả nhóm
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={6}
                                                placeholder="Mô tả các dự án và nhiệm vụ tại đây."
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Thu hút các thành viên của
                                            bạn tham gia bằng một vài
                                            từ về nhóm của bạn
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-end mt-8">
                            <Button
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loader2 className="animate-spin" />
                                ) : null}
                                Lưu
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default GeneralTeam;
