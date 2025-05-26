import { ICompany } from '@/api/company/interface';

interface IProps {
  company: ICompany;
}
export default function CompanyBenefit({ company }: IProps) {
  const { benefits } = company;
  return (
    <section className="bg-light-green rounded-lg mb-2 p-6 overflow-hidden">
      <h3 className="text-lg font-medium ">Quyền lợi công ty</h3>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: benefits || '' }}
      />
    </section>
  );
}
