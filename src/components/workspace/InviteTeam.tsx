"use client";

import { Tag, TagInput } from "emblor";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, UserPlusIcon } from "lucide-react";

const InviteTeam = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<
        number | null
    >(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const inviteMembers = async () => {
        setIsPending(true);
        console.log(tags);
        setTags([]);
        setIsPending(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thêm thành viên</CardTitle>
                <CardDescription>
                    Thêm thành viên vào nhóm của bạn
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-x-2">
                    <TagInput
                        tags={tags}
                        setTags={(newTags) => {
                            setTags(newTags);
                        }}
                        placeholder="Nhập email"
                        styleClasses={{
                            inlineTagsContainer:
                                "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring-0 outline-none focus-within:ring-[2px] focus-within:ring-ring/50 p-1 gap-1",
                            input: "w-full min-w-[80px] shadow-none px-2 h-7",
                            tag: {
                                body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                                closeButton:
                                    "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] text-muted-foreground/80 hover:text-foreground",
                            },
                        }}
                        activeTagIndex={activeTagIndex}
                        setActiveTagIndex={setActiveTagIndex}
                    />
                    <Button
                        disabled={!tags.length || isPending}
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
            </CardContent>
        </Card>
    );
};

export default InviteTeam;
