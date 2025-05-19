import LoginForm from '@/app/(auth)/components/LoginForm';

export default function SignInPage() {
  return (
    <main className=" flex w-full h-[500px] items-center justify-center">
      <div className=" w-full max-w-xl px-4 ">
        <h1 className=" text-center text-2xl font-bold">
          Đăng nhập hệ thống quản trị
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
