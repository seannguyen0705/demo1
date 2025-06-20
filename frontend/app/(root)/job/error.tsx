'use client';
import { useRouter } from 'next/navigation';

export default function JobError() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h3 className="text-xl font-medium">Có lỗi xảy ra, vui lòng thử lại sau</h3>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        Về trang chủ
      </button>
    </main>
  );
}
