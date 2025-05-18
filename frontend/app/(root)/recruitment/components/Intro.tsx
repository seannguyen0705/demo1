import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ScrollToForm from './ScrollToForm';
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
          </div>

          {/* card */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-2">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">
                  Tiếp cận ứng viên chất lượng
                </h3>
                <p className="text-muted-foreground">
                  Kết nối với hàng nghìn ứng viên đã được sàng lọc phù hợp với
                  nhu cầu của doanh nghiệp.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <Briefcase className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">
                  Đăng tin tuyển dụng dễ dàng
                </h3>
                <p className="text-muted-foreground">
                  Tạo và quản lý tin tuyển dụng chỉ trong vài phút với giao diện
                  thân thiện.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <TrendingUp className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Phân tích hiệu quả</h3>
                <p className="text-muted-foreground">
                  Theo dõi hiệu suất tin tuyển dụng và tối ưu hóa chiến lược
                  tuyển dụng của bạn.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">
                  Công cụ sàng lọc thông minh
                </h3>
                <p className="text-muted-foreground">
                  Sử dụng bộ lọc tìm kiếm ứng viên phù hợp nhất với vị trí.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
