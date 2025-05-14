import { RegisterForm } from '../components/RegisterForm';
import BenefitItem from '../components/BenefitItem';
import AuthThirdParty from '../components/AuthThirdParty';

export default async function SignUpPage() {
  const benefits = [
    {
      title: 'Tiếp cận hàng nghìn cơ hội việc làm',
      description:
        'Tìm kiếm việc làm dễ dàng với hàng ngàn tin tuyển dụng được cập nhật liên tục từ nhiều ngành nghề và khu vực khác nhau.',
    },
    {
      title: 'Nhận gợi ý việc làm phù hợp',
      description:
        'Hệ thống đề xuất thông minh giúp bạn nhanh chóng tìm thấy công việc phù hợp với kỹ năng và sở thích cá nhân.',
    },
    {
      title: 'Ứng tuyển nhanh chóng, tiện lợi',
      description:
        'Chỉ với vài cú nhấp chuột, bạn có thể ứng tuyển ngay đến nhà tuyển dụng mà không cần gửi email thủ công.',
    },
  ];

  return (
    <main className=" flex  w-full items-center justify-center">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Registration Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Tạo tài khoản</h1>
            <p className="text-muted-foreground">
              Nhập thông tin để tạo tài khoản
            </p>
          </div>
          <RegisterForm />
          <div className="flex items-center gap-x-2 justify-center">
            <div className="w-full h-[1px] bg-muted-foreground" />
            <span className="text-muted-foreground uppercase ">Hoặc</span>
            <div className="w-full h-[1px] bg-muted-foreground" />
          </div>
          <AuthThirdParty />
        </div>

        {/* Right Column - Benefits */}
        <div className="flex flex-col justify-center space-y-6 rounded-lg dark:bg-muted bg-[#f9f9f9] p-8">
          <h2 className="text-2xl font-bold">Tạo tài khoản</h2>
          {benefits.map((benefit) => (
            <BenefitItem
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
