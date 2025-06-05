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
      <Link href={`/company/${company.data.name}`} className="flex lg:flex-row flex-col items-center gap-2">
        <Image
          src={company.data.logo.url}
          alt={company.data.name}
          width={120}
          height={120}
          className="border-2 size-[120px] border-gray-200 rounded-sm"
        />
        <h3 className="text-lg font-bold">{company.data.name}</h3>
      </Link>
      <h3 className="font-light">{company.data.name}</h3>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Mô hình công ty</span>
        <span>{company.data.type}</span>
      </div>

      <div className="flexob justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Lĩnh vực công ty</span>
        <span>{company.data.industry}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Quy mô công ty</span>
        <span>{company.data.size} nhân viên</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Quốc gia</span>
        <span>{company.data.country}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Ngày làm việc</span>
        <span>{company.data.workingDay}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700 dark:text-gray-200">Giờ làm việc</span>
        <span>{company.data.workingTime}</span>
      </div>
    </article>
  );
}
