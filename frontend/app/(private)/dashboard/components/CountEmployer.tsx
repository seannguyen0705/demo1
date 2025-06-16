import { CountDate } from '@/api/staticstics/interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building2 } from 'lucide-react';
import CompareFigure from './CompareFigure';
import CountUp from 'react-countup';
interface IProps {
  dataEmployers: CountDate[];
}

export default function CountEmployer({ dataEmployers }: IProps) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Tổng số Công ty</CardTitle>
        <Building2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <CountUp end={dataEmployers[0]?.count || 0} duration={2.5} separator="," />
        </div>
        <p className="text-xs text-muted-foreground">
          <CompareFigure lastFigure={dataEmployers[1]?.count || 0} currentFigure={dataEmployers[0]?.count || 0} />
          so với tháng trước
        </p>
      </CardContent>
    </Card>
  );
}
