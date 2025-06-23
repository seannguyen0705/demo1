import { findCompanyByName } from '@/api/company/query';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  companyName: string;
}

export default async function CompanyCard({ companyName }: IProps) {
  const company = await findCompanyByName(companyName);
  return (
    <article className="flex dark:bg-gray-800 h-auto bg-light-green rounded-lg p-4 flex-col gap-2">
      <Link href={`/company/${company.name}`} className="flex lg:flex-row flex-col items-center gap-2">
        <Image
          src={company.logo?.url || '/default_logo.png'}
          alt={company.name}
          width={120}
          height={120}
          className="border-2 size-[120px] border-gray-200 rounded-sm"
        />
        <h3 className="text-lg font-bold">{company.name}</h3>
      </Link>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Mô hình công ty</span>
        <span className="text-right">{company.type}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Lĩnh vực công ty</span>
        <span className="text-right">{company.industry}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Quy mô công ty</span>
        <span className="text-right">{company.size} nhân viên</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Quốc gia</span>
        <span className="text-right">{company.country}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Ngày làm việc</span>
        <span className="text-right">{company.workingDay}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Giờ làm việc</span>
        <span className="text-right">{company.workingTime}</span>
      </div>
    </article>
  );
}
