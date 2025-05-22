import { IUser } from '@/api/interface';
import EditIntro from './EditIntro';

interface IProps {
  user: IUser;
}
export default function Intro({ user }: IProps) {
  return (
    <section className="bg-[#EBF5F4] rounded-[20px] relative p-6">
      <h6 className="text-xl">Giới thiệu bản thân</h6>
      <p className="text-sm text-[#4B4B4B]">
        {user.introduction
          ? user.introduction
          : 'Chưa có thông tin giới thiệu bản thân, hãy cập nhật ngay!'}{' '}
      </p>
      <EditIntro introduction={user.introduction} />
    </section>
  );
}
