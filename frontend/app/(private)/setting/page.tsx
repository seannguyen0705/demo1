import { Metadata } from 'next';
import Setting from './components/Setting';

export const metadata: Metadata = {
  title: 'Cài đặt',
  description: 'Cài đặt tài khoản',
};

export default function SettingPage() {
  return <Setting />;
}
