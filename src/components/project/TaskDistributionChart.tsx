"use client";

import { Label, Pie, PieChart, Sector } from "recharts";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface TaskDistributionChartProps {
    tasks?: {
        done: number;
        inProgress: number;
        overdue: number;
        total: number;
    };
}

const chartConfig = {
    tasks: {
        label: "Công việc",
    },
    done: {
        label: "Hoàn thành",
        color: "hsl(var(--chart-1))",
    },
    inProgress: {
        label: "Đang thực hiện",
        color: "hsl(var(--chart-2))",
    },
    overdue: {
        label: "Quá hạn",
        color: "hsl(var(--chart-3))",
    },
    todo: {
        label: "Chưa thực hiện",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

const TaskDistributionChart = ({
    tasks = { done: 0, inProgress: 0, overdue: 0, total: 0 },
}: TaskDistributionChartProps) => {
    const data = [
        {
            name: "Hoàn thành",
            value: tasks.done,
            fill: "#00b74a",
        },
        {
            name: "Đang thực hiện",
            value: tasks.inProgress,
            fill: "#f7b500",
        },
        {
            name: "Quá hạn",
            value: tasks.overdue,
            fill: "#f44336",
        },
        {
            name: "Chưa thực hiện",
            value:
                tasks.total -
                (tasks.done + tasks.inProgress + tasks.overdue),
            fill: "#e0e0e0",
        },
    ].filter((item) => item.value > 0);
    return (
        <Card>
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-lg font-semibold">
                    Phân bổ công việc
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel />
                            }
                        />
                        <Pie
                            data={data}
                            dataKey={"value"}
                            nameKey={"name"}
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={0}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <Sector
                                    {...props}
                                    outerRadius={outerRadius + 10}
                                />
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {tasks.total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={
                                                        (viewBox.cy ||
                                                            0) + 24
                                                    }
                                                    className="fill-muted-foreground"
                                                >
                                                    Công việc
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Hiện thị tổng số công việc trong dự án
                </p>
            </CardFooter>
        </Card>
    );
};

export default TaskDistributionChart;
