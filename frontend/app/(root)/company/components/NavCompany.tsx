import Link from 'next/link';

interface IProps {
  pathName: string;
  companyName: string;
}
export default function NavCompany({ pathName, companyName }: IProps) {
  const navs = [
    {
      name: 'Giới thiệu',
      href: `/company/${companyName}`,
    },
    {
      name: 'Đánh giá',
      href: `/company/${companyName}/reviews`,
    },
  ];
  return (
    <nav className="mb-3 w-full border-b ">
      <ul className="flex items-center  gap-4">
        {navs.map((nav) => (
          <li
            className={`border-b-2  px-2 ${pathName === nav.href ? 'border-green' : 'border-transparent hover:border-gray-300 '}`}
            key={nav.href}
          >
            <Link className="" href={nav.href}>
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
