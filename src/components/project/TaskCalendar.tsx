"use client";

import { ProjectTaskProps } from "@/types/project";
import {
    addMonths,
    format,
    getDay,
    parse,
    startOfWeek,
    subMonths,
} from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

interface TaskCalendarProps {
    initialTasks: ProjectTaskProps[];
}

import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/lib/data-calendar.css";
import EventCard from "./EventCard";

const locales = {
    "vi-VN": vi,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const TaskCalendar = ({ initialTasks }: TaskCalendarProps) => {
    const [value, setValue] = useState(
        initialTasks.length > 0
            ? new Date(initialTasks[0].dueDate)
            : new Date(),
    );

    const event = initialTasks.map((task) => ({
        start: new Date(task.startDate),
        end: new Date(task.dueDate),
        title: task.title,
        project: task.project,
        assigneeTo: task.assigneeTo,
        status: task.status,
        id: task.id,
    }));

    const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
        if (action === "PREV") {
            setValue(subMonths(value, 1));
        } else if (action === "NEXT") {
            setValue(addMonths(value, 1));
        } else if (action === "TODAY") {
            setValue(new Date());
        }
    };
    return (
        <Calendar
            localizer={localizer}
            events={event}
            views={["month"]}
            defaultView="month"
            toolbar
            showAllEvents
            className="min-h-[calc(100vh-40rem)]"
            max={
                new Date(
                    new Date().setFullYear(
                        new Date().getFullYear() + 1,
                    ),
                )
            }
            formats={{
                weekdayFormat: (date, culture, localizer) =>
                    localizer?.format(date, "EEE", culture) ?? "",
            }}
            components={{
                eventWrapper: ({ event }) => (
                    <EventCard
                        id={event.id}
                        title={event.title}
                        assigneeTo={event.assigneeTo}
                        project={event.project}
                        status={event.status}
                    />
                ),
            }}
        />
    );
};

export default TaskCalendar;
