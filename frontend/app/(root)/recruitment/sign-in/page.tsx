import LoginForm from '@/app/(auth)/components/LoginForm';
import IntroCards from '../components/IntroCards';
import TopCompany from '../components/TopCompany';
import SpecialWeb from '../components/SpecialWeb';

export default function SignInPage() {
  return (
    <main>
      <section className="w-full py-12 md:py-24 bg-gradient-to-b dark:from-black dark:to-gray-900 from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* form */}
            <div className="space-y-6 ">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                  Chào mừng bạn quay trở lại
                </h1>
                <p className="text-muted-foreground">
                  Tìm kiếm ứng viên tài năng và chất lượng
                </p>
              </div>

              <LoginForm />
            </div>

            {/* card */}
            <IntroCards />
          </div>
        </div>
      </section>

      <TopCompany />
      <SpecialWeb />
    </main>
  );
}
