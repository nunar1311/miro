"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
    className?: string;
    placeholder?: string;
}

const DatePicker = ({
    value,
    onChange,
    className,
    placeholder = "Pick a date",
}: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "group bg-background hover:bg-background border-input w-full justify-start px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                        !value && "text-muted-foreground",
                        className,
                    )}
                >
                    <CalendarIcon
                        size={16}
                        className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                        aria-hidden="true"
                    />
                    <span
                        className={cn(
                            "truncate",
                            !value && "text-muted-foreground",
                        )}
                    >
                        {value ? (
                            format(value, "P", { locale: vi })
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                    initialFocus
                    locale={vi}
                    disabled={(date) =>
                        date < (value ?? new Date()) ||
                        date <
                            new Date(new Date().setHours(0, 0, 0, 0))
                    }
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
