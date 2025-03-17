"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import { LinkIcon, Loader2, UserPlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteSchema, inviteType } from "@/lib/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";

interface InviteTeamProps {
    teamId?: string;
    inviteCode?: string;
}

const InviteTeam = ({ teamId, inviteCode }: InviteTeamProps) => {
    const [isPending, setIsPending] = useState<boolean>(false);

    const form = useForm<inviteType>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            email: "",
        },
    });
    const inviteMembers = async () => {
        setIsPending(true);

        setIsPending(false);
    };

    const inviteLink = `${process.env
        .NEXT_PUBLIC_BASE_URL!}/invite/${teamId}/join/${inviteCode}`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thêm thành viên</CardTitle>
                <CardDescription>
                    Thêm thành viên vào nhóm của bạn
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Form {...form}>
                    <form>
                        <div className="flex justify-between items-end gap-x-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Nhập email"
                                                required
                                                className="w-full"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isPending}
                                onClick={inviteMembers}
                            >
                                {isPending ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <UserPlusIcon />
                                )}
                                Mời
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="space-y-2">
                    <Input value={inviteLink} readOnly />
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant={"outline"}
                            disabled={isPending}
                        >
                            Tạo lại
                        </Button>
                        <Button type="button">
                            <LinkIcon />
                            Sao chép
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default InviteTeam;
