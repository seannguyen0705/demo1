import { ICompany } from '@/apiService/company/interface';
import EditCompanyIntro from './EditCompanyIntro';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { cookies } from 'next/headers';
interface IProps {
  company: ICompany;
}
export default async function CompanyIntro({ company }: IProps) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Authentication') || cookieStore.has('Refresh');
  const { overview } = company;
  return (
    <section className="bg-light-green mb-2 overflow-hidden rounded-lg p-6 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-medium ">Giới thiệu công ty</h3>
        {isAuth && <EditCompanyIntro company={company} />}
      </div>
      {overview && overview !== '<p></p>' ? (
        <div dangerouslySetInnerHTML={{ __html: overview || '' }} className="" />
      ) : (
        <p className="text-gray-500">Chưa cập nhật</p>
      )}

      <Link target="_blank" className="mt-4 flex items-center gap-2 border-t py-3 text-blue-500" href={company.website}>
        <Globe />
        <span>Website Công ty</span>
      </Link>
    </section>
  );
}
