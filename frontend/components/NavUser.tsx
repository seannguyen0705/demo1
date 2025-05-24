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
        <li className=" border-b  " key={nav.name}>
          <NavItem
            key={nav.name}
            name={nav.name}
            href={nav.href}
            icon={nav.icon}
          />
        </li>
      ))}
      <li className="border-b py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100">
        <button
          onClick={logout}
          className=" text-sm w-full text-left flex items-center gap-2"
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
      className=" py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 flex text-sm items-center gap-2"
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
};
