import { Rocket } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạo tin tuyển dụng',
  description: 'Tạo tin tuyển dụng chi tiết và chuyên nghiệp',
};

export default function CreateJob() {
  return (
    <main className="px-8">
      <div className="text-center">
        <div className="inline-flex text-green items-center gap-2">
          <Rocket />
          <h3 className="text-2xl font-bold">Đăng tin tuyển dụng</h3>
        </div>
        <p className="text-muted-foreground dark:text-gray-200">Tạo tin tuyển dụng chi tiết và chuyên nghiệp</p>
      </div>
    </main>
  );
}
