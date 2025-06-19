import LoginForm from '@/app/(auth)/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập hệ thống quản trị',
  description: 'Đăng nhập hệ thống quản trị để quản lý hệ thống',
};

export default function SignInPage() {
  return (
    <main className=" flex w-full h-[500px] items-center justify-center">
      <div className=" w-full max-w-xl px-4 ">
        <h1 className=" text-center text-2xl font-bold">Đăng nhập hệ thống quản trị</h1>
        <LoginForm />
      </div>
    </main>
  );
}
