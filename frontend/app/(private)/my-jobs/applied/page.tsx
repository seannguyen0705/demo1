import AppliedJobPage from './components/AppliedJobPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Việc làm đã ứng tuyển',
  description: 'Việc làm đã ứng tuyển của bạn',
};

export default function AppliedJobs() {
  return <AppliedJobPage />;
}
