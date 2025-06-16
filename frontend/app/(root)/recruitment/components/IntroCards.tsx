import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Briefcase, Filter, TrendingUp, Users } from 'lucide-react';

type Intro = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function IntroCards() {
  const intros = [
    {
      title: 'Tiếp cận ứng viên chất lượng',
      description: 'Kết nối với hàng nghìn ứng viên đã được sàng lọc phù hợp với nhu cầu của doanh nghiệp.',
      icon: <Users className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Đăng tin tuyển dụng dễ dàng',
      description: 'Tạo và quản lý tin tuyển dụng chỉ trong vài phút với giao diện thân thiện.',
      icon: <Briefcase className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Phân tích hiệu quả',
      description: 'Theo dõi hiệu suất tin tuyển dụng và tối ưu hóa chiến lược tuyển dụng của bạn.',
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Công cụ sàng lọc thông minh',
      description: 'Sử dụng bộ lọc tìm kiếm ứng viên phù hợp nhất với vị trí.',
      icon: <Filter className="h-12 w-12 text-primary" />,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {intros.map((intro) => (
        <IntroCard key={intro.title} {...intro} />
      ))}
    </div>
  );
}

function IntroCard({ title, description, icon }: Intro) {
  return (
    <Card>
      <CardContent className="p-6 space-y-2">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
