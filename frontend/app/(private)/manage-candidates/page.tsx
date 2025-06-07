import { ScrollText } from 'lucide-react';
import CandidateTable from './components/CandidateTable';

export default function ManageCandidates() {
  return (
    <main className="px-4">
      {/* <section className="flex justify-center flex-col items-center">
        <div className="flex items-center gap-2 text-green ">
          <ScrollText className="" />
          <h1 className="text-2xl font-bold">Quản lý ứng viên</h1>
        </div>
        <p className="text-muted-foreground dark:text-gray-200">Quản lý ứng viên đã ứng tuyển vào công việc của bạn</p>
      </section> */}

      <CandidateTable />
    </main>
  );
}
