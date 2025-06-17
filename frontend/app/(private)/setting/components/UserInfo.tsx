import { IUser } from '@/api/interface';
import { Info, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface IProps {
  user: IUser;
}

export default function UserInfo({ user }: IProps) {
  return (
    <section className="bg-light-green space-y-4 rounded-[20px] dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-bold">Thông tin tài khoản</h2>
      <div className="flex flex-col sm:flex-row sm:items-center ">
        <label className="sm:min-w-[200px] font-bold">Email:</label>
        <div>
          <p>{user.email}</p>
          <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Info className="w-4 h-4" /> <span>Không thể thay đổi email đăng nhập</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center ">
        <label className="sm:min-w-[200px] font-bold">Họ và tên:</label>
        <div>
          <p>{user.fullName}</p>
          <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Info className="w-4 h-4" /> <span>Tên tài khoản được đồng bộ với thông tin hồ sơ</span>
          </p>
          <Link href="/profile-personal" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
            Sửa hồ sơ cá nhân
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
