'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { JobStatistics } from '@/api/job/interface';

export const description = 'A bar chart with a label';

const chartConfig = {
  status: {
    label: 'Trạng thái',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

interface IProps {
  statistics: JobStatistics;
}
export default function BarChartJob({ statistics }: IProps) {
  const { viewCount, countHired, countInterviewing, countNew, countSeen, countRejected } = statistics;

  const chartData = [
    { status: 'Lượt xem', count: viewCount },
    { status: 'Mới nộp', count: countNew },
    { status: 'Đã xem', count: countSeen },
    { status: 'Phỏng vấn', count: countInterviewing },
    { status: 'Đã nhận', count: countHired },
    { status: 'Từ chối', count: countRejected },
  ];
  return (
    <Card className="">
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="status" tickLine={false} tickMargin={10} axisLine={false} />

            <Bar dataKey="count" fill="var(--color-status)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
