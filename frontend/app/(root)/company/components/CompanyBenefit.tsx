import { ICompany } from '@/api/company/interface';
import { cookies } from 'next/headers';
import EditCompanyBenefit from './EditCompanyBenefit';
import CompanyImage from './CompanyImage';
import { getCompanyImage } from '@/api/company-image/query';

interface IProps {
  company: ICompany;
}
export default async function CompanyBenefit({ company }: IProps) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Authentication') || cookieStore.has('Refresh');
  const { benefits } = company;
  const { data: companyImages } = await getCompanyImage(company.id);

  return (
    <section className="bg-light-green mb-2 overflow-hidden rounded-lg p-6 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-medium ">Quyền lợi công ty</h3>
        {isAuth && <EditCompanyBenefit company={company} companyImages={companyImages} />}
      </div>
      {benefits && benefits !== '<p></p>' ? (
        <div className="my-4" dangerouslySetInnerHTML={{ __html: benefits || '' }} />
      ) : (
        <p className="text-gray-500">Chưa cập nhật</p>
      )}
      <CompanyImage companyImages={companyImages} />
    </section>
  );
}
