import ProfilePage from './components/ProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ cá nhân',
  description: 'Hồ sơ cá nhân của bạn',
};

export default function ProfilePersonal() {
  return <ProfilePage />;
}
