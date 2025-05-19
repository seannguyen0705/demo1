import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Briefcase, TrendingUp } from 'lucide-react';
import ScrollToForm from './ScrollToForm';
import Link from 'next/link';
import IntroCards from './IntroCards';
export default function Intro() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b dark:from-black dark:to-gray-900 from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* intro */}
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Dành cho nhà tuyển dụng
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tìm kiếm ứng viên phù hợp nhanh chóng và hiệu quả
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Nền tảng của chúng tôi kết nối doanh nghiệp của bạn với hàng nghìn
              ứng viên tiềm năng, giúp bạn tiết kiệm thời gian và chi phí trong
              quá trình tuyển dụng.
            </p>

            <ScrollToForm />
            <div className="  text-sm flex items-center gap-x-1">
              <span className="text-muted-foreground">
                Đã có tài khoản doanh nghiệp?
              </span>
              <Link href="/recruitment/sign-in" className="underline">
                Đăng nhập
              </Link>
            </div>
          </div>

          {/* card */}
          <IntroCards />
        </div>
      </div>
    </section>
  );
}
