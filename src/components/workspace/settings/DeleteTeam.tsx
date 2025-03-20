"use client";

import { deleteTeam } from "@/action/workspace/deleteTeam";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useMutation } from "@tanstack/react-query";
import { Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DeleteTeamProps {
    teamId?: string;
    name?: string;
}

const DeleteTeam = ({ teamId, name }: DeleteTeamProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            confirm: "",
        },
    });

    const ref = useRef<HTMLDivElement>(null);

    const { mutate: onDelete, isPending } = useMutation({
        mutationFn: async () => {
            await deleteTeam(teamId as string);
        },
        onSuccess: () => {
            router.push("/team");
            toast.success("Nhóm đã được xóa");
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
        },
    });

    useOnClickOutside(ref, () => {
        form.reset();
        setOpen(false);
    });

    return (
        <Card className="bg-accent/20">
            <CardHeader>
                <CardTitle className="text-2xl">Xóa nhóm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="w-full h-16 border-2 flex items-center px-4 rounded-lg bg-accent/50 mb-8">
                    <TriangleAlert className="text-destructive mr-2" />
                    <CardDescription>
                        Xóa vĩnh viễn nhóm <strong>{name}</strong>.
                        Hành động này không thể hoàn tác. Hãy tiến
                        hành thận trọng.
                    </CardDescription>
                </div>
                <Dialog open={open}>
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => setOpen(true)}
                        >
                            Xóa nhóm
                        </Button>
                    </DialogTrigger>
                    <DialogContent ref={ref} className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>
                                Bạn có muốn xoá nhóm này không?
                            </DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-16 border-2 flex items-center px-4 rounded-lg bg-accent/50 mt-3">
                            <TriangleAlert className="size-8 text-destructive mr-2" />
                            <DialogDescription>
                                Không thể hoàn tác hành động này. Thao
                                tác này sẽ xóa vĩnh viễn nhóm{" "}
                                <strong>{name}</strong>. Hãy tiến hành
                                thận trọng.
                            </DialogDescription>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(() =>
                                    onDelete(),
                                )}
                            >
                                <div className="flex flex-col gap-y-2">
                                    <FormField
                                        control={form.control}
                                        name="confirm"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Để xác nhận, hãy
                                                    nhập
                                                    <strong>
                                                        {name}
                                                    </strong>
                                                    vào hộp bên dưới.
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    autoFocus
                                                    className="w-full p-2 border-2 rounded-lg"
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            disabled={isPending}
                                            onClick={() => {
                                                setOpen(false);
                                                form.reset();
                                            }}
                                        >
                                            Trở lại
                                        </Button>
                                        <Button
                                            disabled={
                                                form.watch(
                                                    "confirm",
                                                ) !== name ||
                                                isPending
                                            }
                                            type="submit"
                                            variant={"destructive"}
                                        >
                                            {isPending ? (
                                                <Loader2 className="animate-spin" />
                                            ) : null}
                                            Xoá
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default DeleteTeam;
