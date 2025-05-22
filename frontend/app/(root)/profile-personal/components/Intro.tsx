import { IUser } from '@/api/interface';
import EditIntro from './EditIntro';

interface IProps {
  user: IUser;
}
export default function Intro({ user }: IProps) {
  return (
    <section className="dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px] relative p-6">
      <h6 className="text-xl">Giới thiệu bản thân</h6>
      <p className="text-sm dark:text-gray-400 text-gray-500">
        {user.introduction
          ? user.introduction
          : 'Chưa có thông tin giới thiệu bản thân, hãy cập nhật ngay!'}{' '}
      </p>
      <EditIntro introduction={user.introduction} />
    </section>
  );
}
