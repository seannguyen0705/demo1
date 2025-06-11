import { ICompany } from '@/api/company/interface';
import { StatisticReviewCompany } from '@/api/review/interface';
import { Briefcase, MapPinIcon, Star, UsersRound } from 'lucide-react';
import Image from 'next/image';
import StarRating from './StarRating';
import { cookies } from 'next/headers';
import UploadLogo from './UploadLogo';
import UploadBackground from './UploadBackground';
interface IProps {
  company: ICompany;
  numJobs: number;
  statistics: StatisticReviewCompany;
}
export default async function HeaderCompany({ company, numJobs, statistics }: IProps) {
  const { addresses, name } = company;
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Authentication') || cookieStore.has('Refresh');

  return (
    <section className="bg-light-green mb-6 overflow-hidden rounded-lg dark:bg-gray-900">
      {isAuth ? (
        <UploadBackground company={company} />
      ) : (
        <Image
          src={company.background?.url || '/default_bg.webp'}
          alt={company.name}
          width={800}
          height={130}
          className="h-[130px] w-full object-cover"
        />
      )}

      {isAuth ? (
        <UploadLogo company={company} />
      ) : (
        <Image
          src={company.logo?.url || '/default_logo.png'}
          alt={company.name}
          width={128}
          height={128}
          className="relative -top-14 left-8 size-[128px] rounded-sm border-2 border-white bg-white object-cover"
        />
      )}

      <div className="relative -top-12 space-y-2 px-8">
        <h1 className="mb-2 text-2xl font-medium text-gray-900">{company.name}</h1>

        {addresses.map((item) => (
          <div key={item.id} className="flex items-center gap-2 ">
            <MapPinIcon className="" />
            <span className="text-sm">{item.detail + ', ' + item.province.name}</span>
          </div>
        ))}

        <div className="flex flex-col gap-x-5 gap-y-2 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2 text-blue-500">
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
              icon={<Star size={16} className="fill-yellow-500 text-yellow-500" />}
            />
            <span className="">{statistics.avg}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
