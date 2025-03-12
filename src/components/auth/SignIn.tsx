"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const loginSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
});

const SignIn = ({
    handleSent,
}: {
    handleSent: (value: string) => void;
}) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const pathname = usePathname();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async (value: z.infer<typeof loginSchema>) => {
        setIsPending(true);
        // await authClient.emailOtp
        //     .sendVerificationOtp({
        //         email: value.email,
        //         type: "email-verification",
        //     })
        //     .then(() => {
        //         handleSent?.(value.email);
        //     })
        //     .catch(() => {
        //         setIsPending(false);
        //         form.setError("email", {
        //             message: "Đã xảy ra sự cố, vui lòng thử lại",
        //         });
        //     });

        // void signIn("resend", {
        //     email: value.email,
        // })
        //     .then(() => {
        //         handleSent(value.email);
        //     })
        //     .catch(() => {
        //         setIsPending(false);
        //         form.setError("email", {
        //             message: "Vui lòng thử lại",
        //         });
        //     })
        //     .finally(() => {
        //         setIsPending(false);
        //     });
    };

    const handleSignIn = async (provider: "github" | "google") => {
        setIsPending(true);
        await authClient.signIn
            .social({
                provider: provider,
                callbackURL: "/onboarding",
            })

            .catch(() => {
                setIsPending(false);
            });
    };

    useEffect(() => {
        setIsPending(false);
    }, [pathname]);

    return (
        <div className="w-full md:w-7/12 max-w-sm min-w-min mx-auto md:py-20 py-8 ">
            <h2 className="font-semibold text-lg md:text-xl text-primary">
                Đăng nhập
            </h2>
            <p className="text-muted-foreground font-light text-sm">
                Đăng nhập vào tài khoản của bạn
            </p>

            <div className="mt-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mb-8"
                    >
                        <div
                            className={cn(
                                "px-4 py-2 mb-8 border-l-2 border-primary text-sm text-foreground hidden",
                                form.formState.errors.email &&
                                    "block",
                            )}
                        >
                            {form.formState.errors.email?.message}
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel className="font-bold">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            autoFocus
                                            required
                                            className="bg-background"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full font-bold"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : null}
                            Tiếp tục
                        </Button>
                    </form>
                </Form>
                <div className="flex flex-col mb-6">
                    <hr className="h-0 border-t mt-0.5" />
                    <div className="-mt-2 text-xs text-center">
                        <span className="px-2 bg-background text-muted-foreground">
                            Hoặc với
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-2">
                    <Button
                        className="w-full font-bold"
                        variant={"outline"}
                        disabled={isPending}
                        onClick={() => handleSignIn("github")}
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin size-4" />
                        ) : (
                            <Icons.github className="w-5 h-5" />
                        )}
                        Github
                    </Button>
                    <Button
                        className="w-full font-bold"
                        variant={"outline"}
                        disabled={isPending}
                        onClick={() => handleSignIn("google")}
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin size-4" />
                        ) : (
                            <Icons.google className="w-5 h-5" />
                        )}
                        Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
