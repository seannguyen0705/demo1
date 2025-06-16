'use client';

import * as React from 'react';

import { Bar, Label, LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { JobStatistics } from '@/api/job/interface';
import NotePieChartJob from './NotePieChartJob';

export const description = 'A donut chart with text';

const chartConfig = {
  visitors: {
    label: 'Ứng viên',
  },
  new: {
    label: 'Mới',
    color: 'var(--color-green)',
  },
  seen: {
    label: 'Đã xem',
    color: 'var(--color-yellow)',
  },
  interviewing: {
    label: 'Phỏng vấn',
    color: 'var(--chart-3)',
  },
  hired: {
    label: 'Đã nhận',
    color: 'var(--color-blue)',
  },
  rejected: {
    label: 'Từ chối',
    color: 'var(--color-chart-1)',
  },
} satisfies ChartConfig;

interface IProps {
  jobStatistics: JobStatistics;
}
export default function PieChartJob({ jobStatistics }: IProps) {
  const { countHired, countInterviewing, countNew, countRejected, countSeen, countTotal, viewCount } = jobStatistics;
  const chartData = [
    { status: 'new', count: countNew, fill: 'var(--color-new)' },
    { status: 'rejected', count: countRejected, fill: 'var(--color-rejected)' },
    { status: 'hired', count: countHired, fill: 'var(--color-hired)' },
    { status: 'interviewing', count: countInterviewing, fill: 'var(--color-interviewing)' },
    { status: 'seen', count: countSeen, fill: 'var(--color-seen)' },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0"></CardHeader>
      <CardContent className="flex-1 pb-0">
        {countTotal > 0 ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="count" nameKey="status" innerRadius={60} strokeWidth={5}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {countTotal.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Ứng viên
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground">Không có ứng viên ứng tuyển</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <NotePieChartJob />
        <div className="text-muted-foreground leading-none">{viewCount} lượt xem</div>
      </CardFooter>
    </Card>
  );
}
