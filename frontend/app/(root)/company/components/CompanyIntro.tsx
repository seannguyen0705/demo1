import { ICompany } from '@/api/company/interface';
import EditCompanyIntro from './EditCompanyIntro';
import Link from 'next/link';
import { Globe } from 'lucide-react';
interface IProps {
  company: ICompany;
}
export default function CompanyIntro({ company }: IProps) {
  const { overview } = company;
  return (
    <section className="rounded-lg mb-2 p-6 bg-light-green overflow-hidden">
      <div className="flex justify-between border-b pb-4 mb-4 items-center">
        <h3 className="text-lg font-medium ">Giới thiệu công ty</h3>
        <EditCompanyIntro company={company} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: overview || '' }} className="" />

      <Link
        target="_blank"
        className="text-blue-500 mt-4 py-3 border-t flex items-center gap-2"
        href={company.website}
      >
        <Globe />
        <span>Website Công ty</span>
      </Link>
    </section>
  );
}
