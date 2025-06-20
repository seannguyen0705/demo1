import { cookies } from 'next/headers';
import decodeUser from '@/utils/helpers/decodeUser';
import JobList from './JobList';
import { UserRole } from '@/utils/enums';

export default async function NewestJobs() {
  const cookieStore = await cookies();
  const token = cookieStore.get('Authentication')?.value || cookieStore.get('Refresh')?.value;
  const user = token ? decodeUser(token) : null;

  if (user && user.role !== UserRole.CANDIDATE) {
    return;
  }

  return (
    <section className="container mx-auto px-2">
      <h3 className="text-center text-xl md:text-3xl my-4 md:my-10">Việc làm mới nhất</h3>
      <JobList />
    </section>
  );
}
