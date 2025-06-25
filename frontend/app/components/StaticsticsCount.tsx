import { getStaticsticsCount } from '@/apiService/staticstics/query';
import { BriefcaseBusiness, Building } from 'lucide-react';
import { FaUsers } from 'react-icons/fa';

export default async function StaticsticsCount() {
  const { data } = await getStaticsticsCount();
  return (
    <ul className="grid sm:grid-cols-3 gap-4">
      <li className="p-4 rounded-lg flex items-center gap-2">
        <div className="bg-green rounded-full p-3">
          <BriefcaseBusiness color="white" />
        </div>
        <div className="flex-col">
          <p className="text-2xl font-bold">{data.countJobs}</p>
          <p className="text-sm text-gray-500">Việc làm</p>
        </div>
      </li>

      <li className="p-4 rounded-lg flex items-center gap-2">
        <div className="bg-green rounded-full p-3">
          <FaUsers color="white" size={24} />
        </div>
        <div className="flex-col">
          <p className="text-2xl font-bold">{data.countCandidates}</p>
          <p className="text-sm text-gray-500">Ứng viên</p>
        </div>
      </li>

      <li className="p-4 rounded-lg flex items-center gap-2">
        <div className="bg-green rounded-full p-3">
          <Building color="white" />
        </div>
        <div className="flex-col">
          <p className="text-2xl font-bold">{data.countCompanies}</p>
          <p className="text-sm text-gray-500">Công ty</p>
        </div>
      </li>
    </ul>
  );
}
