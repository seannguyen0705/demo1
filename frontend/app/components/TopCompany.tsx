import { getTop10Companies } from '@/api/company/query';
import CompanyCard from './CompanyCard';

export default async function TopCompany() {
  const companies = await getTop10Companies();

  return (
    <section className="container mx-auto px-2">
      <h3 className="text-center text-xl md:text-3xl my-4 md:my-10">Top 10 công ty tốt nhất</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company, index) => (
          <li key={company.id} className={`${index === 9 && 'lg:hidden'}`}>
            <CompanyCard company={company} />
          </li>
        ))}
      </ul>
    </section>
  );
}
