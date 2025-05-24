import { getMe } from '@/api/auth/query';
import Info from './components/Info';
import MyCv from './components/MyCv';
import Intro from './components/Intro';
import Experience from './components/Experience';
import Skill from './components/Skill';
import { UserRole } from '@/utils/enums';
export default async function ProfilePersonal() {
  const user = await getMe();
  return (
    <main className="  flex lg:flex-row flex-col ">
      <div className=" flex-1 px-4 space-y-4">
        <Info user={user.data} />
        {user.data.role === UserRole.CANDIDATE && <Intro user={user.data} />}
        {user.data.role === UserRole.CANDIDATE && <Experience />}
        {user.data.role === UserRole.CANDIDATE && <Skill />}
      </div>
      {user.data.role === UserRole.CANDIDATE && <MyCv />}
    </main>
  );
}
