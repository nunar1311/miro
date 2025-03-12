import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import EditTeam from "./EditTeam";
import { Label } from "../ui/label";
import InviteTeam from "./InviteTeam";
import { $Enums, Workspace } from "@prisma/client";

interface DataProps extends Workspace {
    members: {
        userId: string;
        accessLevel: $Enums.AccessLevel;
    }[];
}

const SettingsForm = ({ data }: { data: DataProps }) => {
    return (
        <div className="max-w-4xl w-full mx-auto p-3 md:p-6 space-y-6">
            <Label className="text-4xl font-semibold">Cài đặt</Label>
            <EditTeam
                name={data.name}
                description={data.description || ""}
            />

            <InviteTeam />
            <Card className="border-destructive flex flex-row items-center justify-between">
                <CardHeader>
                    <CardTitle className="text-destructive">
                        Xóa nhóm
                    </CardTitle>
                    <CardDescription>
                        Xóa toàn bộ nhóm và dữ liệu của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button type="button" variant={"destructive"}>
                        Xóa nhóm
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsForm;
