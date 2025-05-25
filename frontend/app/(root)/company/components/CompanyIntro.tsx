import { ICompany } from '@/api/company/interface';

interface IProps {
  company: ICompany;
}
export default function CompanyIntro({ company }: IProps) {
  const { overview } = company;
  return (
    <section className="rounded-lg p-6 bg-light-green overflow-hidden">
      <h3 className="text-lg font-medium mb-4">Giới thiệu công ty</h3>
      <p className="text-gray-600">{overview}</p>
    </section>
  );
}
