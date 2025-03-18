import React from "react";
import { Card } from "../ui/card";
import { TaskActivity } from "@/types/project";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";

interface TaskActivityFeedProps {
    activities?: TaskActivity[];
}

const TaskActivityFeed = ({ activities }: TaskActivityFeedProps) => {
    return (
        <Card className="p-4 gap-2">
            <Label className="text-lg">Hoạt động</Label>
            <ScrollArea className="max-h-80">
                {activities?.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-center gap-x-2"
                    >
                        <Avatar className="size-7 rounded-md">
                            <AvatarImage
                                src={activity.user.image}
                                alt={activity.user.name}
                            />
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-sm">
                                <span className="font-semibold">
                                    {activity.user.name}
                                </span>
                                : {activity.description}
                            </p>

                            <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(
                                    new Date(activity.createdAt),
                                    {
                                        addSuffix: true,
                                        locale: vi,
                                    },
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </Card>
    );
};

export default TaskActivityFeed;
