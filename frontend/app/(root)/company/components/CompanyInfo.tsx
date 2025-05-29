import { ICompany } from '@/api/company/interface';
import NavCompany from './NavCompany';
import EditCompanyInfo from './EditCompanyInfo';
import { cookies } from 'next/headers';
interface IProps {
  company: ICompany;
}
export default async function CompanyInfo({ company }: IProps) {
  const cookieStore = await cookies();
  const isAuth =
    cookieStore.has('Authentication') || cookieStore.has('Refresh');
  const info = [
    {
      label: 'Mô hình công ty',
      value: company.type || 'Chưa cập nhật',
    },
    {
      label: 'Lĩnh vực công ty',
      value: company.industry || 'Chưa cập nhật',
    },
    {
      label: 'Quy mô công ty',
      value: company.size ? `${company.size} nhân viên` : 'Chưa cập nhật',
    },
    {
      label: 'Quốc gia',
      value: company.country || 'Chưa cập nhật',
    },
    {
      label: 'Ngày làm việc',
      value: company.workingDay || 'Chưa cập nhật',
    },
    {
      label: 'Giờ làm việc',
      value: company.workingTime || 'Chưa cập nhật',
    },
  ];
  return (
    <section className="bg-light-green mb-2 overflow-hidden rounded-lg p-6 dark:bg-gray-900">
      <NavCompany
        pathName={`/company/${company.name}`}
        companyName={company.name}
      />

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium ">Thông tin chung</h3>
        {isAuth && <EditCompanyInfo company={company} />}
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {info.map((item) => (
          <li key={item.label} className="">
            <h6 className="text-sm text-gray-600">{item.label}</h6>
            <p>{item.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
