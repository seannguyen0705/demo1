import { ICompany } from '@/api/company/interface';
import NavCompany from './NavCompany';
import { cookies } from 'next/headers';
import MyReview from './MyReview';
interface IProps {
  company: ICompany;
}
export default async function CompanyReview({ company }: IProps) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Refresh') || cookieStore.has('Authenticate');
  return (
    <section className="bg-light-green mb-2 overflow-hidden rounded-lg p-6 dark:bg-gray-900">
      <NavCompany pathName={`/company/${company.name}/reviews`} companyName={company.name} />
      {isAuth && <MyReview companyId={company.id} />}
    </section>
  );
}
