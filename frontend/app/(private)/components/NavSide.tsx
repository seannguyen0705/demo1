import { IUser } from '@/api/interface';
import getNavMenus from '@/utils/helpers/getNavMenus';

import Link from 'next/link';
import { PiHandWaving } from 'react-icons/pi';

interface IProps {
  user: IUser;
}
export default function NavSide({ user }: IProps) {
  const navs = getNavMenus(user);
  return (
    <div>
      <aside className=" fixed w-64 dark:bg-gray-900 bg-light-green rounded-[20px] p-4 hidden lg:block">
        <p className=" flex items-center gap-2 text-sm">
          <PiHandWaving size={25} color="green" />
          Xin chào
        </p>
        <p className="text-lg">{user.fullName}</p>

        <ul className="mt-4">
          {navs.map((nav) => (
            <li key={nav.name}>
              <Link
                className="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-gray-700"
                href={nav.href}
              >
                {nav.icon}
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
