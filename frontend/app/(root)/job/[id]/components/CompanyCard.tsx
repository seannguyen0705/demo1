import { ICompany } from '@/api/company/interface';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  company: ICompany;
}

export default function CompanyCard({ company }: IProps) {
  return (
    <article className="flex dark:bg-gray-800 h-auto max-h-[400px] bg-light-green rounded-lg p-4 flex-col gap-2">
      <Link href={`/company/${company.name}`} className="flex items-center gap-2">
        <Image src={company.logo.url} alt={company.name} width={120} height={120} />
        <h3 className="text-lg font-bold">{company.name}</h3>
      </Link>
      <h3 className="font-light">{company.name}</h3>

      <div className="flex justify-between ">
        <span className="text-gray-700">Mô hình công ty</span>
        <span>{company.type}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700">Lĩnh vực công ty</span>
        <span>{company.industry}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700">Quy mô công ty</span>
        <span>{company.size} nhân viên</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700">Quốc gia</span>
        <span>{company.country}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700">Ngày làm việc</span>
        <span>{company.workingDay}</span>
      </div>

      <div className="flex justify-between ">
        <span className="text-gray-700">Giờ làm việc</span>
        <span>{company.workingTime}</span>
      </div>
    </article>
  );
}
