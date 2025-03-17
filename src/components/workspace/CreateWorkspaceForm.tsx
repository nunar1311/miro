"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { workspaceSchema, workspaceType } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import { createWorkspace } from "@/action/workspace/createWorkspace";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface CreateWorkspaceFormProps {
    onCancel?: () => void;
}

export const CreateWorkspaceForm = ({
    onCancel,
}: CreateWorkspaceFormProps) => {
    const form = useForm<workspaceType>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const router = useRouter();

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: (values: workspaceType) =>
            createWorkspace(values),
        onSuccess: (data) => {
            form.reset();
            onCancel?.();
            toast.success("Nhóm đã được tạo thành công");
            router.push(`/team/${data?.id}`);
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
        },
    });

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex">
                <CardTitle>Hãy xây dựng một workspace</CardTitle>
                <CardDescription>
                    Tăng năng suất của bạn bằng cách giúp mọi người dễ
                    dàng truy cập các dự án ở cùng một nơi.
                </CardDescription>
            </CardHeader>

            <div className="px-5">
                <Separator />
            </div>

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
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Tên workspace
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Tên workspace"
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
                                            Mô tả workspace
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                cols={6}
                                                placeholder="Mô tả các dự án và nhiệm vụ tại đây."
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Thu hút các thành viên của
                                            bạn tham gia bằng một vài
                                            từ về Không gian làm việc
                                            của bạn
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <Button
                                type="button"
                                variant={"secondary"}
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(
                                    !onCancel && "invisible",
                                )}
                            >
                                Trở về
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loader2 className="animate-spin" />
                                ) : null}
                                Tạo Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
