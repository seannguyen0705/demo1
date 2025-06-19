import Intro from './components/Intro';
import TopCompany from './components/TopCompany';
import SpecialWeb from './components/SpecialWeb';
import CreateBusiness from './components/CreateBusiness';
import { getStaticsticsCount } from '@/api/staticstics/query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tuyển dụng | Home Job Portal',
  description: 'Tuyển dụng nhân sự cho các công ty trong nước và quốc tế',
  openGraph: {
    images: [
      {
        url: `https://${process.env.FRONTEND_DOMAIN}/og_images/recruitment.png`,
      },
    ],
  },
};

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
