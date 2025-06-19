import Intro from './components/Intro';
import TopCompany from './components/TopCompany';
import SpecialWeb from './components/SpecialWeb';
import CreateBusiness from './components/CreateBusiness';
import { getStaticsticsCount } from '@/api/staticstics/query';
export default async function RecruitmentPage() {
  const { data } = await getStaticsticsCount();
  return (
    <main className=" ">
      <Intro />
      <TopCompany />
      <SpecialWeb staticsticsCount={data} />
      <CreateBusiness />
    </main>
  );
}
