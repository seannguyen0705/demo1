'use client';
import { Mail, UserRound, Building2 } from 'lucide-react';
import useCounter from '../hooks/useCounter';
import { IStaticsticsCount } from '@/apiService/staticstics/interface';
interface StatisticItemProps {
  number: number;
  description: string;
  icon: React.ReactNode;
}

function StatisticItem({ number, description, icon }: StatisticItemProps) {
  const { count, ref } = useCounter(number);

  return (
    <li className="shadow dark:bg-muted border rounded-lg p-4 flex flex-col items-center justify-center" ref={ref}>
      <div className="text-4xl font-bold mb-2">{count.toLocaleString()}</div>
      <div className="text-muted-foreground text-center">{description}</div>
      <div className="mt-2 text-primary">{icon}</div>
    </li>
  );
}

interface IProps {
  staticsticsCount: IStaticsticsCount;
}
export default function SpecialWeb({ staticsticsCount }: IProps) {
  const statictics = [
    {
      id: 1,
      number: staticsticsCount.countCompanies,
      description: 'Công ty và Doanh nghiệp',
      icon: <Building2 />,
    },
    {
      id: 2,
      number: staticsticsCount.countApplyJobs,
      description: 'Hồ sơ đã gửi đến Nhà tuyển dụng',
      icon: <Mail />,
    },
    {
      id: 3,
      number: staticsticsCount.countCandidates,
      description: 'Ứng viên kinh nghiệm cao',
      icon: <UserRound />,
    },
  ];

  return (
    <section className=" container mx-auto px-4 md:px-0 mb-[60px]">
      <h3 className="text-center text-2xl font-bold">Điều gì tạo nên sự khác biệt ở Job Portal?</h3>
      <p className="mb-[20px] text-center text-muted-foreground">
        Job Portal là trang tuyển dụng và cơ sở dữ liệu hàng đầu tại Việt Nam.
      </p>

      <ul className="container mx-auto grid md:grid-cols-3 gap-4">
        {statictics.map((statistic) => (
          <StatisticItem
            key={statistic.id}
            number={statistic.number}
            description={statistic.description}
            icon={statistic.icon}
          />
        ))}
      </ul>
    </section>
  );
}
