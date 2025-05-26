'use client';
import NavSide from './components/NavSide';
import Info from './components/Info';
import MyCv from './components/MyCv';
import Intro from './components/Intro';
import Experience from './components/Experience';
import Skill from './components/Skill';
import useGetMe from '@/app/hooks/useGetMe';
export default function ProfilePersonal() {
  const { user, isLoading } = useGetMe();
  if (isLoading || !user) {
    return;
  }
  return (
    <main className="container mx-auto ">
      <NavSide user={user} />
      <div className=" lg:ml-64 flex lg:flex-row flex-col ">
        <div className=" flex-1 px-4 space-y-4">
          <Info user={user} />
          <Intro user={user} />
          <Experience />
          <Skill />
        </div>
        <MyCv />
      </div>
    </main>
  );
}
