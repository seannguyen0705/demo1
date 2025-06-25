import { IUser } from '@/apiService/interface';

export default function getUserAvatar(user: IUser | undefined) {
  return user?.avatar?.url || user?.avatar_url || '/default_avt.png';
}
