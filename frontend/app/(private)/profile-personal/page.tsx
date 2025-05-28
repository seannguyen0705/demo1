'use client';
import Info from './components/Info';
import MyCv from './components/MyCv';
import Intro from './components/Intro';
import Experience from './components/Experience';
import Skill from './components/Skill';
import { UserRole } from '@/utils/enums';
import useGetMe from '@/app/hooks/useGetMe';
export default function ProfilePersonal() {
  const { user } = useGetMe();
  return (
    <main className="flex flex-col lg:flex-row ">
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
