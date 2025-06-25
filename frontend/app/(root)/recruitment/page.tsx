import Intro from './components/Intro';
import TopCompany from './components/TopCompany';
import SpecialWeb from './components/SpecialWeb';
import CreateBusiness from './components/CreateBusiness';
import { getStaticsticsCount } from '@/apiService/staticstics/query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tuyển dụng | Home Job Portal',
  description: 'Tuyển dụng nhân sự cho các công ty trong nước và quốc tế',
  openGraph: {
    images: [
      {
        url: `${process.env.FRONTEND_URL}/og_images/recruitment.png`,
        alt: 'Tuyển dụng | Home Job Portal',
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
