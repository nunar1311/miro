"use client";

import { useMutation } from "@tanstack/react-query";
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
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { userSchema, userType } from "@/lib/schema";
import { useState } from "react";
import { CheckIcon, ChevronDownIcon, Loader2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { countries } from "@/lib/data/countries";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { industryTypesList } from "@/lib/data/industryTypes";
import { roleList } from "@/lib/data/role";
import { updateUser } from "@/action/user/updateUser";
import { useRouter } from "next/navigation";

interface AccountFormProps {
    name: string;
    image?: string;
    email: string;
}

export const AccountForm = ({
    name,
    email,
    image,
}: AccountFormProps) => {
    const form = useForm<userType>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: name,
            email: email,
            image: image,
            country: "",
            about: "",
            industryType: "",
            role: "",
        },
    });

    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: (values: userType) => updateUser(values),
        onSuccess: () => {
            router.push(`/create-workspace`);
            toast.success("Hồ sơ đã được cập nhật");
            form.reset();
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
        },
    });
   

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Thiết lập tài khoản</CardTitle>
                <CardDescription className="">
                    Hoàn tất thông tin cá nhân để thiêt lập tài khoản
                </CardDescription>
            </CardHeader>

            <div className="px-5">
                <Separator />
            </div>

            <CardContent className="border-none">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((e) =>
                            onSubmit(e),
                        )}
                    >
                        <div className="flex flex-col gap-4">
                            <div
                                className={cn(
                                    "px-4 py-1.5 mb-8 border-l-2 border-primary text-sm text-foreground hidden",
                                    form.formState.errors.country &&
                                        "block",
                                    form.formState.errors
                                        .industryType && "block",
                                    form.formState.errors.role &&
                                        "block",
                                    form.formState.errors.about &&
                                        "block",
                                )}
                            >
                                {form.formState.errors.country
                                    ?.message ||
                                    form.formState.errors.industryType
                                        ?.message ||
                                    form.formState.errors.role
                                        ?.message ||
                                    form.formState.errors.about
                                        ?.message}
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Họ và tên
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={
                                                    field.name &&
                                                    "Nhập họ và tên"
                                                }
                                                disabled
                                                required
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Quốc gia
                                        </FormLabel>
                                        <Popover
                                            open={open}
                                            onOpenChange={setOpen}
                                        >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                                                        type="button"
                                                    >
                                                        {field.value ? (
                                                            <span className="flex min-w-0 items-center gap-2">
                                                                <span className="text-lg leading-none">
                                                                    {
                                                                        countries
                                                                            .flatMap(
                                                                                (
                                                                                    group,
                                                                                ) =>
                                                                                    group.items,
                                                                            )
                                                                            .find(
                                                                                (
                                                                                    item,
                                                                                ) =>
                                                                                    item.value ===
                                                                                    field.value,
                                                                            )
                                                                            ?.flag
                                                                    }
                                                                </span>
                                                                <span className="truncate">
                                                                    {
                                                                        countries
                                                                            .flatMap(
                                                                                (
                                                                                    group,
                                                                                ) =>
                                                                                    group.items,
                                                                            )
                                                                            .find(
                                                                                (
                                                                                    item,
                                                                                ) =>
                                                                                    item.value ===
                                                                                    field.value,
                                                                            )
                                                                            ?.label
                                                                    }
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                Chọn
                                                                quốc
                                                                gia
                                                            </span>
                                                        )}
                                                        <ChevronDownIcon
                                                            size={16}
                                                            className="text-muted-foreground/80 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                                                align="start"
                                            >
                                                <Command>
                                                    <CommandInput placeholder="Tìm kiếm quốc gia..." />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            Không tìm
                                                            thấy quốc
                                                            gia nào.
                                                        </CommandEmpty>
                                                        {countries.map(
                                                            (
                                                                group,
                                                            ) => (
                                                                <CommandGroup
                                                                    key={
                                                                        group.continent
                                                                    }
                                                                    heading={
                                                                        group.continent
                                                                    }
                                                                >
                                                                    {group.items.map(
                                                                        (
                                                                            country,
                                                                        ) => (
                                                                            <CommandItem
                                                                                key={
                                                                                    country.value
                                                                                }
                                                                                value={
                                                                                    country.value
                                                                                }
                                                                                onSelect={(
                                                                                    currentValue,
                                                                                ) => {
                                                                                    field.onChange(
                                                                                        currentValue,
                                                                                    );
                                                                                    setOpen(
                                                                                        false,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <span className="text-lg leading-none">
                                                                                    {
                                                                                        country.flag
                                                                                    }
                                                                                </span>{" "}
                                                                                {
                                                                                    country.label
                                                                                }
                                                                                {field.value ===
                                                                                    country.value && (
                                                                                    <CheckIcon
                                                                                        size={
                                                                                            16
                                                                                        }
                                                                                        className="ml-auto"
                                                                                    />
                                                                                )}
                                                                            </CommandItem>
                                                                        ),
                                                                    )}
                                                                </CommandGroup>
                                                            ),
                                                        )}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="industryType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Chọn ngành nghề
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
                                                    <SelectTrigger className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-full">
                                                        <SelectValue placeholder="Chọn ngành nghề" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {industryTypesList.map(
                                                        (
                                                            industry,
                                                        ) => (
                                                            <SelectItem
                                                                key={
                                                                    industry
                                                                }
                                                                value={
                                                                    industry
                                                                }
                                                            >
                                                                {
                                                                    industry
                                                                }
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
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Vai trò trong tổ chức
                                            </FormLabel>
                                            <Select
                                                onValueChange={
                                                    field.onChange
                                                }
                                                defaultValue={
                                                    field.value
                                                }
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-full">
                                                        <SelectValue placeholder="Chọn vai trò" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {roleList.map(
                                                        (role) => (
                                                            <SelectItem
                                                                key={
                                                                    role
                                                                }
                                                                value={
                                                                    role
                                                                }
                                                            >
                                                                {role}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="about"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Mô tả
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder={
                                                    "Mô tả về bản thân"
                                                }
                                                disabled={isPending}
                                            />
                                        </FormControl>
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
                                Cập nhật hồ sơ
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
