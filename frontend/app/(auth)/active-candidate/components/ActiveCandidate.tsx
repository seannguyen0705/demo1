'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import useActiveCandidate from '../hooks/useActiveCandidate';

export default function ActiveCandidatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: activeCandidate, isPending, isError } = useActiveCandidate();

  useEffect(() => {
    if (token) {
      activeCandidate(
        { accountToken: token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
        },
      );
    }
  }, [token]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-200">Đang kích hoạt tài khoản...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Kích hoạt tài khoản thất bại</h2>
          <p className="text-gray-600 dark:text-gray-200 mb-6">Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
          <button
            onClick={() => router.replace('/')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Kích hoạt tài khoản thành công</h2>
          <p className="text-gray-600 mb-6 dark:text-gray-200">Bạn có thể đăng nhập vào hệ thống ngay bây giờ.</p>
          <button
            onClick={() => router.replace('/sign-in')}
            className="px-6 py-2 bg-green hover:bg-green/80 text-white rounded-lg transition-colors"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen"></div>;
}
