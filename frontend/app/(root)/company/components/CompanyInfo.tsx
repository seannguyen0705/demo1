import { ICompany } from '@/api/company/interface';
import NavCompany from './NavCompany';
import EditCompanyInfo from './EditCompanyInfo';
interface IProps {
  company: ICompany;
  isOwner: boolean;
}
export default function CompanyInfo({ company, isOwner }: IProps) {
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
    <section className="rounded-lg mb-2 p-6 bg-light-green overflow-hidden">
      <NavCompany
        pathName={`/company/${company.name}`}
        companyName={company.name}
      />

      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-lg font-medium ">Thông tin chung</h3>
        {isOwner && <EditCompanyInfo company={company} />}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
