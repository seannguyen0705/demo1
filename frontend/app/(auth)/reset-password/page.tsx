'use client';

import FormResetPassword from './components/FormResetPassword';

export default function ResetPasswordPage() {
  return (
    <main className="flex flex-col w-full h-[60vh] items-center justify-center pt-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Đặt lại mật khẩu</h1>
      <FormResetPassword />
    </main>
  );
}
