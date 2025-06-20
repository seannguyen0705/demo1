import { Metadata } from 'next';
import FormForgetPassword from './components/FormForgetPassword';
export const metadata: Metadata = {
  title: 'Quên mật khẩu | Xin chào Admin',
  description: 'Quên mật khẩu hệ thống quản trị',
};

export default function ForgetPasswordPage() {
  return (
    <main className="flex flex-col w-full h-[60vh] items-center justify-center pt-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Quên mật khẩu</h1>
      <FormForgetPassword />
    </main>
  );
}
