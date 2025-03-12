"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Pen } from "lucide-react";
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { colors } from "@/lib/data/colors";
import { projectSchema, projectType } from "@/lib/schema";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { createProject } from "@/action/project/createProject";
import { getProjectByWorkspaceId } from "@/action/project/getProjectByWorkspace";
import { ProjectProps } from "@/types/project";
import { MemberProps } from "@/types/member";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

interface CreateProjectFormProps {
    onCancel: () => void;
}

const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
    const workspaceId = useWorkspaceId();
    const form = useForm<projectType>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            color: "#EF476F",
            workspaceId: workspaceId as string,
            memberAccess: [],
        },
    });

    const [isPending, setIsPending] = useState<boolean>(false);
    const [data, setData] = useState<{
        projects: ProjectProps[];
        members: MemberProps[];
    } | null>(null);

    const router = useRouter();

    useEffect(() => {
        const result = async () => {
            const res = await getProjectByWorkspaceId(
                workspaceId as string,
            );

            setData(res);
        };

        result();
    }, [workspaceId]);

    const onSubmit = async (values: projectType) => {
        try {
            setIsPending(true);
            await createProject(values);
            form.reset();
            onCancel?.();
            toast.success("Dự án đã được tạo thành công");
            router.refresh();
        } catch {
            setIsPending(false);
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
        } finally {
            setIsPending(false);
        }
    };
    return (
        <Card>
            <CardHeader className="flex">
                <CardTitle>Tạo dự án</CardTitle>
                <CardDescription>
                    Organize and manage tasks, resources, and team
                    collaboration.
                </CardDescription>
            </CardHeader>
            <div>
                <Separator />
            </div>
            <CardContent className="border-none">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Màu dự án
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex items-end gap-4">
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            form.getValues(
                                                                "color",
                                                            ),
                                                    }}
                                                    className={`w-20 h-20 rounded-md flex items-center justify-center text-3xl text-background`}
                                                ></div>
                                                <RadioGroup
                                                    className="grid grid-cols-6 gap-2"
                                                    defaultValue={
                                                        field.value
                                                    }
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    {colors.map(
                                                        (item) => (
                                                            <label
                                                                key={`${item.value}`}
                                                                style={{
                                                                    backgroundColor:
                                                                        item.value,
                                                                }}
                                                                className="border-input has-data-[state=checked]:border-ring focus-within:ring-ring/30 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border p-4 text-center shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[2px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
                                                            >
                                                                <RadioGroupItem
                                                                    id={`${item.value}`}
                                                                    value={
                                                                        item.value
                                                                    }
                                                                    className="sr-only after:absolute after:inset-0"
                                                                />
                                                            </label>
                                                        ),
                                                    )}
                                                </RadioGroup>
                                                <Button
                                                    size={"icon"}
                                                    variant={
                                                        "secondary"
                                                    }
                                                >
                                                    <Pen />
                                                </Button>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
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
                                            Mô tả dự án
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={6}
                                                placeholder="Our team organizes marketing projects and tasks here."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="memberAccess"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Truy cập dự án
                                        </FormLabel>
                                        <FormDescription>
                                            Chọn thành viên workspace
                                            nào sẽ có quyền truy cập
                                            vào dự án này
                                        </FormDescription>
                                        <div>
                                            {data?.members.map(
                                                (member) => (
                                                    <div
                                                        key={
                                                            member.id
                                                        }
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <Checkbox
                                                            id={
                                                                member.id
                                                            }
                                                            checked={field.value?.includes(
                                                                member.userId as string,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                const currentValue =
                                                                    field.value ||
                                                                    [];
                                                                if (
                                                                    checked
                                                                ) {
                                                                    field.onChange(
                                                                        [
                                                                            ...currentValue,
                                                                            member.userId,
                                                                        ],
                                                                    );
                                                                } else {
                                                                    field.onChange(
                                                                        currentValue.filter(
                                                                            (
                                                                                id,
                                                                            ) =>
                                                                                id !==
                                                                                member.userId,
                                                                        ),
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <Label
                                                            htmlFor={
                                                                member.id
                                                            }
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                                                        >
                                                            {
                                                                member
                                                                    .user
                                                                    .name
                                                            }{" "}
                                                            (
                                                            {member.accessLevel.toLowerCase()}
                                                            )
                                                        </Label>
                                                    </div>
                                                ),
                                            )}
                                        </div>
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

export default CreateProjectForm;
