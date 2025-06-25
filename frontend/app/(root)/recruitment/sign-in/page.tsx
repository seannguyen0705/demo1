import LoginForm from '@/app/(auth)/components/LoginForm';
import IntroCards from '../components/IntroCards';
import TopCompany from '../components/TopCompany';
import SpecialWeb from '../components/SpecialWeb';
import { getStaticsticsCount } from '@/apiService/staticstics/query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập | Xin chào nhà tuyển dụng',
  description: 'Tìm kiếm ứng viên tài năng và chất lượng tại Job Portal',
  openGraph: {
    images: [
      {
        url: `${process.env.FRONTEND_URL}/og_images/recruitment-sign-in.png`,
        alt: 'Đăng nhập | Xin chào nhà tuyển dụng',
      },
    ],
  },
};

export default async function SignInPage() {
  const { data } = await getStaticsticsCount();

  return (
    <main>
      <section className="w-full py-12 md:py-24 bg-gradient-to-b dark:from-black dark:to-gray-900 from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* form */}
            <div className="space-y-6 ">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Chào mừng bạn quay trở lại</h1>
                <p className="text-muted-foreground">Tìm kiếm ứng viên tài năng và chất lượng</p>
              </div>

              <LoginForm />
            </div>

            {/* card */}
            <IntroCards />
          </div>
        </div>
      </section>

      <TopCompany />
      <SpecialWeb staticsticsCount={data} />
    </main>
  );
}
