import Content from './components/Content';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tổng quan',
  description: 'Tổng quan hệ thống | Thống kê về việc làm, ứng viên, nhà tuyển dụng và đơn ứng tuyển',
};

export default function Dashboard() {
  return <Content />;
}
