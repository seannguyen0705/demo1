import { ICompany } from '@/api/company/interface';
import NavCompany from './NavCompany';
import { cookies } from 'next/headers';
import MyReview from './MyReview';
import decodeUser from '@/utils/helpers/decodeUser';
import { UserRole } from '@/utils/enums';
interface IProps {
  company: ICompany;
}
export default async function CompanyReview({ company }: IProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('Authentication')?.value || cookieStore.get('Refresh')?.value;
  const user = token ? decodeUser(token) : null;

  return (
    <section className="bg-light-green mb-2 overflow-hidden rounded-lg p-4 lg:p-6 dark:bg-gray-900">
      <NavCompany pathName={`/company/${company.name}/reviews`} companyName={company.name} />
      {user?.role === UserRole.CANDIDATE && <MyReview companyId={company.id} />}
    </section>
  );
}
