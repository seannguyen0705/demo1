import { logout } from '@/api/auth/action';
import { IUser } from '@/api/interface';
import getNavMenus from '@/utils/helpers/getNavMenus';

import { LogOut } from 'lucide-react';
import Link from 'next/link';

interface IProps {
  user: IUser;
}
export default function NavUser({ user }: IProps) {
  const navs = getNavMenus(user);
  return (
    <ul className=" dark:bg-gray-800 dark:text-white  ">
      {navs.map((nav) => (
        <li className="border-b" key={nav.name}>
          <NavItem
            key={nav.name}
            name={nav.name}
            href={nav.href}
            icon={nav.icon}
          />
        </li>
      ))}
      <li className="border-b px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 text-left text-sm"
        >
          <LogOut />
          Đăng xuất{' '}
        </button>
      </li>
    </ul>
  );
}

interface INavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}
const NavItem = ({ name, href, icon }: INavItem) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
};
