import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

const SharingTeam = () => {
    return (
        <Card className="bg-accent/20">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">
                    Cộng tác viên
                </CardTitle>
                <Button>Mời</Button>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Mời những cộng tác viên bên ngoài tham gia nhóm
                    này. Những cộng tác viên hiện tại được liệt kê bên
                    dưới.
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default SharingTeam;
