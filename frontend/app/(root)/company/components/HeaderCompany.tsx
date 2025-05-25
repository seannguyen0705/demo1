import { ICompany } from '@/api/company/interface';
import { StatisticReviewCompany } from '@/api/review/interface';
import { Briefcase, MapPinIcon, Star, UsersRound } from 'lucide-react';
import Image from 'next/image';
import StarRating from './StarRating';
interface IProps {
  company: ICompany;
  numJobs: number;
  statistics: StatisticReviewCompany;
}
export default function HeaderCompany({
  company,
  numJobs,
  statistics,
}: IProps) {
  const { address } = company;

  return (
    <section className="mb-6 rounded-lg bg-light-green overflow-hidden">
      <Image
        src={company.background?.url || '/default_bg.webp'}
        alt={company.name}
        width={800}
        height={130}
        className="w-full h-[130px] object-cover"
      />
      <Image
        src={company.logo?.url || '/default_logo.png'}
        alt={company.name}
        width={128}
        height={128}
        className="size-[128px] border-2 border-white relative -top-14 rounded-sm left-8 bg-white"
      />
      <div className="relative -top-12 px-8 space-y-2">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          {company.name}
        </h1>

        {address.map((item) => (
          <div key={item} className="flex items-center gap-2 ">
            <MapPinIcon className="" />
            <span className="text-sm">{item}</span>
          </div>
        ))}

        <div className=" flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-5">
          <div className="text-blue-500 flex items-center gap-2">
            <Briefcase />
            <span className="text-sm">{numJobs} Vị trí đang tuyển</span>
          </div>

          <div className="flex items-center gap-2">
            <UsersRound />
            <span className="text-sm">{statistics.count} đánh giá </span>
          </div>

          <div className="flex items-center gap-2">
            <StarRating
              rating={+statistics.avg}
              icon={
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
              }
            />
            <span className="">{statistics.avg}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
