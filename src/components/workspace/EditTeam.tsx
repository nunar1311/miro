"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { workspaceSchema, workspaceType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

interface EditTeamProps {
    name: string;
    description: string;
}

const EditTeam = ({ name, description }: EditTeamProps) => {
    const form = useForm<workspaceType>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: name,
            description: description,
        },
    });
    const [isPending, setIsPending] = useState<boolean>(false);

    const onSubmit = async (values: workspaceType) => {
        setIsPending(true);
        console.log(values);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cài đặt nhóm</CardTitle>
                <CardDescription>
                    Cài đặt thông tin nhóm của bạn
                </CardDescription>
            </CardHeader>
            <CardContent>
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

export default EditTeam;
