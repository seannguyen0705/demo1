import Image from 'next/image';

export default function TopCompany() {
  const companies = [
    {
      id: 1,
      name: 'Instagram',
      image: '/instagram.svg',
      description:
        'Instagram là một nền tảng mạng xã hội cho phép người dùng chia sẻ hình ảnh và video.',
    },
    {
      id: 2,
      name: 'Tesla',
      image: '/tesla.svg',
      description: 'Tesla là một công ty sản xuất ô tô điện từ Mỹ.',
    },
    {
      id: 3,
      name: "MC Donald's",
      image: '/mcdonald.svg',
      description:
        "McDonald's là một hệ thống nhà hàng ăn uống nhanh nổi tiếng từ Mỹ.",
    },
    {
      id: 4,
      name: 'Apple',
      image: '/apple.svg',
      description: 'Apple là một công ty sản xuất điện tử Mỹ.',
    },
  ];
  return (
    <section className="dark:bg-[#111111] mb-[30px] bg-light-green pt-[60px] pb-[120px]">
      <h3 className="text-center mb-[20px] dark:text-muted-foreground text-[#222] text-2xl font-bold">
        Được tin tưởng bởi các doanh nghiệp hàng đầu
      </h3>
      <ul className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <li key={company.id}>
            <CompanyItem company={company} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CompanyItem({
  company,
}: {
  company: { id: number; name: string; image: string; description: string };
}) {
  return (
    <article
      className=" flex flex-col justify-center items-center "
      key={company.id}
    >
      <Image src={company.image} alt={company.name} width={100} height={100} />
      <h4 className=" font-semibold mb-[10px] text-lg ">{company.name}</h4>
      <p className=" text-muted-foreground">{company.description}</p>
    </article>
  );
}
