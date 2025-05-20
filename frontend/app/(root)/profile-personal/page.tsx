import { getMe } from '@/api/query';
import NavSide from './components/NavSide';
import { cookies } from 'next/headers';
import { UserRole } from '@/utils/enums';
import { IUser } from '@/api/interface';

export default async function ProfilePersonal() {
  const cookieStore = await cookies();
  const Role = cookieStore.get('Role');
  const user = (await getMe(Role?.value as UserRole)) as { data: IUser };
  return (
    <main className=" container mx-auto">
      <NavSide user={user.data} />
    </main>
  );
}
