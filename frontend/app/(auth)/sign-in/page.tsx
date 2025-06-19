import AuthThirdParty from '../components/AuthThirdParty';
import Benefits from '../components/Benefits';
import LoginForm from '../components/LoginForm';
import Exception from '../components/Exception';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào hệ thống',
  openGraph: {
    images: [
      {
        url: `${process.env.FRONTEND_URL}/og_images/sign-in.png`,
        alt: 'Đăng nhập',
      },
    ],
  },
};

interface IProps {
  searchParams: Promise<{
    error?: string;
  }>;
}
export default async function SignInPage({ searchParams }: IProps) {
  const { error } = await searchParams;
  return (
    <main className="flex w-full items-center justify-center pt-8">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Registration Form */}
        <div className="space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Chào mừng bạn quay trở lại</h1>
            <p className="text-muted-foreground">Tìm việc làm phù hợp với bạn</p>
          </div>
          <Exception error={error} />
          <LoginForm />
          <div className="flex items-center gap-x-2 justify-center">
            <div className="w-full h-[1px] bg-muted-foreground" />
            <span className="text-muted-foreground uppercase ">Hoặc</span>
            <div className="w-full h-[1px] bg-muted-foreground" />
          </div>
          <AuthThirdParty />
        </div>

        {/* Right Column - Benefits */}
        <div className="flex flex-col justify-center space-y-6 rounded-lg dark:bg-muted bg-[#f9f9f9] p-4 lg:p-8">
          <h2 className="text-2xl font-bold">Đăng nhập</h2>
          <Benefits />
        </div>
      </div>
    </main>
  );
}
