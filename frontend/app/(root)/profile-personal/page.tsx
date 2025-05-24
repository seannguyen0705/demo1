import { getMe } from '@/api/auth/query';
import NavSide from './components/NavSide';
import Info from './components/Info';
import MyCv from './components/MyCv';
import Intro from './components/Intro';
import Experience from './components/Experience';
import Skill from './components/Skill';
export default async function ProfilePersonal() {
  const user = await getMe();
  return (
    <main className="container mx-auto ">
      <NavSide user={user.data} />
      <div className=" lg:ml-64 flex lg:flex-row flex-col ">
        <div className=" flex-1 px-4 space-y-4">
          <Info user={user.data} />
          <Intro user={user.data} />
          <Experience />
          <Skill />
        </div>
        <MyCv />
      </div>
    </main>
  );
}
