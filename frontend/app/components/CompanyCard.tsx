import { ICompany } from '@/api/company/interface';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  company: ICompany;
}

export default function CompanyCard({ company }: IProps) {
  const provinceNames = company.addresses.map((address) => address.province.name);
  const setProvinceNames = new Set(provinceNames);

  return (
    <article className="h-full">
      <Link href={`/company/${company.name}`}>
        <Card className="p-0 pt-6 overflow-hidden flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Image
              src={company.logo?.url || '/default_logo.png'}
              alt={company.name}
              width={200}
              height={200}
              className="size-[200px] rounded-md shadow-2xl"
            />

            <h6 className="text-xl font-bold">{company.name}</h6>
          </div>

          <div className="flex flex-col gap-2 bg-light-green dark:bg-gray-800 py-4">
            <div className="flex justify-between px-4 gap-2">
              <p className="text-sm">{Array.from(setProvinceNames).join('-')}</p>
              <div className="text-sm inline-flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                {company.jobCount} việc làm
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </article>
  );
}
