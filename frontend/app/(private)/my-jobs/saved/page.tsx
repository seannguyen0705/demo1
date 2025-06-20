import SaveJobPage from './components/SaveJobPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Việc làm đã lưu',
  description: 'Việc làm đã lưu của bạn',
};

export default function SavedJobs() {
  return <SaveJobPage />;
}
