'use client';
import Info from './Info';
import MyCv from './MyCv';
import Intro from './Intro';
import Experience from './Experience';
import Skill from './Skill';
import { UserRole } from '@/utils/enums';
import useGetMe from '@/app/hooks/useGetMe';
export default function ProfilePage() {
  const { user } = useGetMe();
  return (
    <main className="flex flex-col lg:flex-row">
      <div className="flex-1 space-y-4 px-4">
        <Info user={user} />
        <Intro user={user} />
        {user?.role === UserRole.CANDIDATE && <Experience />}
        {user?.role === UserRole.CANDIDATE && <Skill />}
      </div>
      {user?.role === UserRole.CANDIDATE && <MyCv />}
    </main>
  );
}
