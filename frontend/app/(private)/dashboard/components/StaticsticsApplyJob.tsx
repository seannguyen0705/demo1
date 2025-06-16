'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CountDate } from '@/api/staticstics/interface';

const chartConfig = {
  count: {
    label: 'Số lượng',
    color: 'var(--color-green)',
  },
} satisfies ChartConfig;

interface IProps {
  dataApplyJobs: CountDate[];
}

export function StaticsticsApplyJob({ dataApplyJobs }: IProps) {
  const chartData = dataApplyJobs
    .map((item) => ({
      month: new Date(item.date).toLocaleDateString('vi-VN', { month: 'short' }),
      count: item.count,
    }))
    .reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tăng trưởng đơn ứng tuyển theo tháng</CardTitle>
        <CardDescription>Biểu đồ tăng trưởng đơn ứng tuyển trong 6 tháng qua</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis type="number" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" fill="var(--color-green)" radius={8}></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
