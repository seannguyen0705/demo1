import ActiveCandidate from './components/ActiveCandidate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kích hoạt tài khoản',
};

export default function ActiveCandidatePage() {
  return <ActiveCandidate />;
}
