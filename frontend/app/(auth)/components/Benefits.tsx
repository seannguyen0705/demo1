import BenefitItem from './BenefitItem';

export default function Benefits() {
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
    <ul>
      {benefits.map((benefit) => (
        <li key={benefit.title}>
          <BenefitItem
            title={benefit.title}
            description={benefit.description}
          />
        </li>
      ))}
    </ul>
  );
}
