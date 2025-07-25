import { IUser } from '@/apiService/interface';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/apiService/auth/action';
import getNavMenus from '@/utils/helpers/getNavMenus';

interface IProps {
  openNavSide: boolean;
  setOpenNavSide: (openNavSide: boolean) => void;
  user: IUser;
}

export default function UserNavSide({ openNavSide, setOpenNavSide, user }: IProps) {
  const navs = getNavMenus(user);
  return (
    <div
      className={`fixed top-0 lg:hidden right-0 h-full w-64 dark:bg-gray-900 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        openNavSide ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <nav onClick={() => setOpenNavSide(false)}>
        <ul className="text-sm">
          <li className="flex justify-center items-center gap-2 py-2 px-4">
            <span className="text-lg font-semibold">{user.fullName}</span>
          </li>
          {navs.map((nav) => (
            <li key={nav.name}>
              <Link className="flex items-center gap-2 py-2 px-4 " href={nav.href}>
                <span>{nav.icon}</span>
                <span>{nav.name}</span>
              </Link>
            </li>
          ))}

          <li className="py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100">
            <button onClick={logout} className="  w-full text-left flex items-center gap-2">
              <LogOut />
              Đăng xuất{' '}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
