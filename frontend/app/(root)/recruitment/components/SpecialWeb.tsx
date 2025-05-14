export default function SpecialWeb() {
  const statictics = [
    {
      id: 1,
      number: '1023',
      description: 'Công ty và Doanh nghiệp',
    },
    {
      id: 2,
      number: '10000+',
      description: 'Hồ sơ đã gửi đến Nhà tuyển dụng',
    },
    {
      id: 3,
      number: '10000+',
      description: 'Hồ sơ Ứng viên kinh nghiệm cao',
    },
  ];
  return (
    <section>
      <h3 className=" text-center text-2xl font-bold">
        Điều gì tạo nên sự khác biệt ở Job Portal?
      </h3>
      <p className=" text-center text-muted-foreground">
        Job Portal là trang tuyển dụng và cơ sở dữ liệu hàng đầu tại Việt Nam.
      </p>

      <ul>
        {statictics.map((statistic) => (
          <li key={statistic.id}>
            <h4>{statistic.number}</h4>
            <p>{statistic.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
