import React from "react";
import { Card } from "../ui/card";
import { TaskActivity } from "@/types/project";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import AvatarUser from "../AvatarUser";
import {
    Timeline,
    TimelineContent,
    TimelineDate,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle,
} from "../ui/timeline";

interface TaskActivityFeedProps {
    activities?: TaskActivity[];
}

const TaskActivityFeed = ({ activities }: TaskActivityFeedProps) => {
    return (
        <Card className="p-4 gap-2">
            <Label className="text-lg">Hoạt động</Label>
            <ScrollArea className="max-h-80 hidden-scrollbar">
                <Timeline>
                    {activities?.map((activity, index) => (
                        <TimelineItem
                            key={activity.id}
                            step={index}
                            className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-2"
                        >
                            <TimelineHeader>
                                <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                                <TimelineTitle className="mt-0.5">
                                    {activity.user.name}
                                </TimelineTitle>
                                <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary/30 group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                                    <AvatarUser
                                        user={activity.user}
                                        size="md"
                                    />
                                </TimelineIndicator>
                            </TimelineHeader>
                            <TimelineContent className="text-foreground mt-2 rounded-lg border px-4 py-3">
                                {activity.description}
                                <TimelineDate className="mt-1 mb-0">
                                    {formatDistanceToNow(
                                        new Date(activity.createdAt),
                                        {
                                            addSuffix: true,
                                            locale: vi,
                                        },
                                    )}
                                </TimelineDate>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </ScrollArea>
        </Card>
    );
};

export default TaskActivityFeed;
