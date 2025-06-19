import { Building2 } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center mt-[30px] flex-col gap-2 h-[calc(100vh-120px)]">
      <h3 className="text-2xl font-bold">Không tìm thấy công ty</h3>
      <Building2 className="size-40 text-green" />
    </div>
  );
}
