"use client";

import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { taskSchema, taskType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask } from "@/action/task/createTask";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useProjectId } from "@/hooks/useProjectId";
import DatePicker from "../DatePicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { TaskStatuses } from "@/lib/data/status";
import { Icons } from "../Icons";
import { PriorityLevels } from "@/lib/data/priority";
import { getProjectDetails } from "@/action/project/getProjectDetails";
import { ProjectProps } from "@/types/project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface CreateTaskFormProps {
    onCancel: () => void;
}

const CreateTaskForm = ({ onCancel }: CreateTaskFormProps) => {
    const workspaceId = useWorkspaceId();
    const projectId = useProjectId();

    const router = useRouter();

    const form = useForm<taskType>({
        // resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            status: TaskStatus.TODO,
            dueDate: new Date(),
            startDate: new Date(),
            priority: TaskPriority.LOW,
            assigneeId: "",
        },
    });

    const { data } = useQuery({
        queryKey: ["workspace", workspaceId, projectId],
        queryFn: async () => {
            const res = await getProjectDetails(
                workspaceId as string,
                projectId as string,
            );

            return res?.project as unknown as ProjectProps;
        },
    });

    console.log(data?.members.map((member) => member.userId));

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: async (values: taskType) => {
            await createTask(
                values,
                workspaceId as string,
                projectId as string,
            );
        },
        onSuccess: () => {
            toast.success("Tạo công việc thành công");
            onCancel();
            router.refresh();
        },
        onError: () => {
            toast.error("Có lỗi xảy ra khi tạo công việc");
        },
    });

    return (
        <Card>
            <CardHeader className="flex">
                <CardTitle>Tạo công việc</CardTitle>
                <CardDescription>
                    Organize and manage tasks, resources, and team
                    collaboration.
                </CardDescription>
            </CardHeader>
            <div>
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
                                    form.formState.errors.title &&
                                        "block",
                                    form.formState.errors.description
                                        ?.message && "block",
                                    form.formState.errors.status
                                        ?.message && "block",
                                    form.formState.errors.priority
                                        ?.message && "block",
                                )}
                            >
                                {form.formState.errors.title
                                    ?.message ||
                                    form.formState.errors.description
                                        ?.message ||
                                    form.formState.errors.status
                                        ?.message ||
                                    form.formState.errors.priority
                                        ?.message}
                            </div>

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Tên dự án
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Nhập tên dự án"
                                                required
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Mô tả công việc
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={2}
                                                placeholder="Our team organizes marketing projects and tasks here."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="assigneeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Người thực hiện
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={
                                                field.onChange
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-full">
                                                    <SelectValue placeholder="Chọn người thực hiện" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                                                {data?.members?.map(
                                                    (member) => (
                                                        <SelectItem
                                                            key={
                                                                member?.id
                                                            }
                                                            value={
                                                                member?.userId
                                                            }
                                                        >
                                                            <Avatar className="size-6 rounded-md">
                                                                <AvatarImage
                                                                    src={
                                                                        member
                                                                            .user
                                                                            .image
                                                                    }
                                                                />
                                                            </Avatar>
                                                            <span className="truncate">
                                                                {
                                                                    member
                                                                        ?.user
                                                                        .name
                                                                }
                                                            </span>
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Ngày bắt đầu
                                            </FormLabel>
                                            <DatePicker {...field} />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Ngày kết thúc
                                            </FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Độ ưu tiên
                                            </FormLabel>
                                            <Select
                                                defaultValue={
                                                    field.value
                                                }
                                                onValueChange={
                                                    field.onChange
                                                }
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-full">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                                                    {PriorityLevels.map(
                                                        (
                                                            priority,
                                                        ) => (
                                                            <SelectItem
                                                                key={
                                                                    priority.label
                                                                }
                                                                value={
                                                                    priority.priority
                                                                }
                                                            >
                                                                <span className="truncate">
                                                                    {
                                                                        priority.label
                                                                    }
                                                                </span>
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Trạng thái
                                            </FormLabel>
                                            <Select
                                                defaultValue={
                                                    field.value
                                                }
                                                onValueChange={
                                                    field.onChange
                                                }
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-full">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                                                    {TaskStatuses.map(
                                                        (status) => (
                                                            <SelectItem
                                                                key={
                                                                    status.status
                                                                }
                                                                value={
                                                                    status.status
                                                                }
                                                            >
                                                                <span className="flex items-center gap-2">
                                                                    <Icons.statusDot
                                                                        className={cn(
                                                                            "size-4",
                                                                            status.color,
                                                                        )}
                                                                    />
                                                                    <span className="truncate">
                                                                        {
                                                                            status.label
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* <FormField
                                control={form.control}
                                name="attachments"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Tệp đính kèm
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="file"
                                                multiple
                                                disabled={isPending}
                                                value={field.value
                                                    ?.map(
                                                        (item) =>
                                                            item.name,
                                                    )
                                                    .join(",")}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            /> */}
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <Button
                                type="button"
                                variant={"secondary"}
                                onClick={onCancel}
                                disabled={isPending}
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
                                Tạo dự án
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateTaskForm;
