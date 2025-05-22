import { IUser } from '@/api/interface';

export default function getUserAvatar(user: IUser) {
  return user.avatar_url || user.avatar?.url || '/default_avt.png';
}
